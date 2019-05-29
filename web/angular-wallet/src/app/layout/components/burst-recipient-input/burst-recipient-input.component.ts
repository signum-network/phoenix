import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {convertAddressToNumericId} from '@burstjs/util';
import {AccountService} from '../../../setup/account/account.service';
import jsQR from 'jsqr';

export enum RecipientType {
  UNKNOWN = 0,
  ADDRESS = 1,
  ID,
  ALIAS,
}

export enum RecipientValidationStatus {
  UNKNOWN = 'unknown',
  INVALID = 'invalid',
  VALID = 'valid',
}

export class Recipient {

  constructor(
    public addressRaw = '',
    public amountNQT = '',
    public addressRS = '',
    public status = RecipientValidationStatus.UNKNOWN,
    public type = RecipientType.UNKNOWN,
  ) {

  }
}


@Component({
  selector: 'burst-recipient-input',
  templateUrl: './burst-recipient-input.component.html',
  styleUrls: ['./burst-recipient-input.component.scss']
})
export class BurstRecipientInputComponent implements OnInit {

  recipient = new Recipient();
  @Output()
  recipientChange = new EventEmitter();
  @Output()
  qrCodeUpload = new EventEmitter();

  @Input('appearance') appearance: string = '';
  @Input('disabled') disabled: boolean = false;

  @ViewChild('file') file: ElementRef;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  applyRecipientType(recipient: string): void {
    this.recipient.addressRS = '';
    this.recipient.status = RecipientValidationStatus.UNKNOWN;
    const r = recipient.trim();
    if (r.length === 0) {
      this.recipient.type = RecipientType.UNKNOWN;
    } else if (r.startsWith('BURST-')) {
      this.recipient.type = RecipientType.ADDRESS;
    } else if (/^\d+$/.test(r)) {
      this.recipient.type = RecipientType.ID;
    } else {
      this.recipient.type = RecipientType.ALIAS;
    }
  }


  validateRecipient(): void {
    let accountFetchFn;
    let id = this.recipient.addressRaw.trim();
    switch (this.recipient.type) {
      case RecipientType.ALIAS:
        accountFetchFn = this.accountService.getAlias;
        break;
      case RecipientType.ADDRESS:
        id = convertAddressToNumericId(id);
      // tslint:disable-next-line:no-switch-case-fall-through
      case RecipientType.ID:
        accountFetchFn = this.accountService.getAccount;
        break;
      default:
      // no op
    }

    if (!accountFetchFn) {
      return;
    }

    accountFetchFn.call(this.accountService, id).then(({accountRS}) => {
      this.recipient.addressRS = accountRS;
      this.recipient.status = RecipientValidationStatus.VALID;
    }).catch(() => {
      this.recipient.addressRS = '';
      this.recipient.status = RecipientValidationStatus.INVALID;
    }).finally(() => {
        // TODO: use Recipient class
        this.recipientChange.emit(this.recipient);
      }
    );

  }

  getRecipientTypeName = (): string => RecipientType[this.recipient.type];

  getValidationHint(): string {
    // TODO: localization
    switch (this.recipient.status) {
      case RecipientValidationStatus.UNKNOWN:
        return 'The address was not validated yet';
      case RecipientValidationStatus.VALID:
        return 'Address was successfully verified';
      case RecipientValidationStatus.INVALID:
        return 'This address does not seem valid. Verify if it really exists!';
    }
  }

  getValidationIcon(): string {
    switch (this.recipient.status) {
      case RecipientValidationStatus.UNKNOWN:
        return 'help_outline';
      case RecipientValidationStatus.VALID:
        return 'check_circle';
      case RecipientValidationStatus.INVALID:
        return 'error_outline';
    }
  }

  getValidationClass(): string {
    return 'badge ' + this.recipient.status.toString().toLocaleLowerCase();
  }

  parseQR(): void {
    const file = this.file.nativeElement.files[0];

    if (file) {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
            const width = img.naturalWidth,
                  height = img.naturalHeight;

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent): void => {

              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const { data }  = ctx.getImageData(0, 0, width, height);
              const qr = jsQR(data, width, height);
              if (qr) {
                const url = new URLSearchParams(qr.data);
                this.applyRecipientType(url.get('receiver'));
                this.recipient.addressRaw = url.get('receiver');
                this.validateRecipient();
                this.qrCodeUpload.emit({
                  recipient: this.recipient,
                  amountNQT: url.get('amountNQT'),
                  feeNQT: url.get('feeNQT'),
                  immutable: url.get('immutable') === 'true'
                });
              }
            };

            window.URL.revokeObjectURL(img.src);
            reader.readAsDataURL(file);
        };
    }
  }
}
