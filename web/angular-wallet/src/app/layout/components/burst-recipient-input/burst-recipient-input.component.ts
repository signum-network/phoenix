import {Component, EventEmitter, Input, Output, ViewChild, ElementRef, OnChanges} from '@angular/core';
import {convertAddressToNumericId, convertNumericIdToAddress, isBurstAddress} from '@burstjs/util';
import {AccountService} from '../../../setup/account/account.service';
import jsQR from 'jsqr';
import {NotifierService} from 'angular-notifier';

// generate a unique id for 'for', see https://github.com/angular/angular/issues/5145#issuecomment-226129881
let nextId = 0;

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
    public amount = '',
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
export class BurstRecipientInputComponent implements OnChanges {

  fileId = `file-${nextId++}`;
  recipient = new Recipient();

  @Input() recipientValue: string;
  @Input() withQrCode = true;
  @Input('appearance') appearance = '';
  @Input('disabled') disabled = false;

  @Output()
  recipientChange = new EventEmitter();
  @Output()
  qrCodeUpload = new EventEmitter();


  @ViewChild('file', {static: false}) file: ElementRef;

  constructor(private accountService: AccountService,
              private notifierService: NotifierService) {
  }

  ngOnChanges(): void {
    if (!this.recipientValue) {
      this.recipient = new Recipient();
      return;
    }
    this.applyRecipientType(this.recipientValue);
    this.validateRecipient(this.recipientValue);
  }

  applyRecipientType(recipient: string): void {
    const r = recipient.trim();
    this.recipient.addressRaw = r;
    this.recipient.addressRS = '';
    this.recipient.status = RecipientValidationStatus.UNKNOWN;
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


  validateRecipient(recipient: string): void {
    let accountFetchFn;
    this.recipient.addressRaw = recipient.trim();
    let id = this.recipient.addressRaw;
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
      this.recipient.addressRS = (isBurstAddress(this.recipient.addressRaw)) ?
        this.recipient.addressRaw : convertNumericIdToAddress(this.recipient.addressRaw);
      this.recipient.status = RecipientValidationStatus.INVALID;
    }).finally(() => {
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
    if (!file) {
      return;
    }

    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      // reduce the image by 1/4 to make it more reliable
      const width = Math.round(img.naturalWidth / 4),
        height = Math.round(img.naturalHeight / 4);

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent): void => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width * 4, height * 4, 0, 0, width, height);
        const {data} = ctx.getImageData(0, 0, width, height);
        const qr = jsQR(data, width, height);
        if (qr) {
          const url = new URLSearchParams(qr.data);
          const recipient = url.get('receiver').trim();
          this.applyRecipientType(recipient);
          this.validateRecipient(recipient);
          this.qrCodeUpload.emit({
            recipient: this.recipient,
            amountNQT: url.get('amountNQT'),
            feeNQT: url.get('feeNQT'),
            immutable: url.get('immutable') === 'true',
            feeSuggestionType: url.get('feeSuggestionType'),
            messageIsText: url.get('messageIsText') !== 'false'
          });
          this.notifierService.notify('success', 'QR parsed successfully');
        } else {
          this.notifierService.notify('error', 'Error parsing QR code');
        }
      };

      window.URL.revokeObjectURL(img.src);
      reader.readAsDataURL(file);
    };
  }
}
