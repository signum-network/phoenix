import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import jsQR from 'jsqr';
import {NotifierService} from 'angular-notifier';
import {DomainService} from 'app/main/send-burst/domain/domain.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Address, AddressPrefix} from '@signumjs/core';
import {AccountService} from '../../setup/account/account.service';

// generate a unique id for 'for', see https://github.com/angular/angular/issues/5145#issuecomment-226129881
let nextId = 0;

export enum RecipientType {
  UNKNOWN = 0,
  ADDRESS = 1,
  ID,
  ALIAS,
  UNSTOPPABLE,
}

export enum RecipientValidationStatus {
  UNKNOWN = 'unknown',
  INVALID = 'invalid',
  VALID = 'valid',
  UNSTOPPABLE_OUTAGE = 'unstoppable-outage'
}

export class Recipient {

  constructor(
    public addressRaw = '',
    public amount = '',
    public addressRS = '',
    public status = RecipientValidationStatus.UNKNOWN,
    public type = RecipientType.UNKNOWN,
    public publicKey = ''
  ) {

  }
}

export interface QRData {
  recipient: Recipient;
  amountNQT: string;
  feeNQT: string;
  immutable: boolean;
  feeSuggestionType: string;
  encrypt: boolean;
  messageIsText: boolean;
  message?: string;
}

@Component({
  selector: 'recipient-input',
  templateUrl: './recipient-input.component.html',
  styleUrls: ['./recipient-input.component.scss']
})
export class RecipientInputComponent implements OnChanges {

  loading = false;
  fileId = `file-${nextId++}`;
  recipient = new Recipient();
  _recipientValue = '';
  recipientFieldInputChange$: Subject<string> = new Subject<string>();

  @Input() withQrCode = true;
  // tslint:disable-next-line: no-input-rename
  @Input('appearance') appearance = '';
  // tslint:disable-next-line: no-input-rename
  @Input('disabled') disabled = false;
  // tslint:disable-next-line: no-input-rename
  @Input('isTestNet') isTestNet = false;

  @Output()
  recipientChange = new EventEmitter();
  @Output()
  qrCodeUpload = new EventEmitter<QRData>();


  @Input()
  get recipientValue(): string {
    return this._recipientValue;
  }

  set recipientValue(recipientValue: string) {
    this._recipientValue = recipientValue;
    this.onRecipientFieldInputChange(recipientValue);
  }

  @ViewChild('file', {static: false}) file: ElementRef;

  constructor(private accountService: AccountService,
              private notifierService: NotifierService,
              private domainService: DomainService) {

    this.recipientFieldInputChange$.pipe(
      debounceTime(500), distinctUntilChanged()
    )
      .subscribe((model: string) => {
        this.applyRecipientType(model);
        this.validateRecipient(model);
      });
  }

  onRecipientFieldInputChange(query: string): void {
    this.recipientFieldInputChange$.next(query);
  }

  ngOnChanges(): void {
    if (!this.recipientValue) {
      this.recipient = new Recipient();
      return;
    }
  }

  private isReedSolomonAddress(address: string): boolean {
    try {
      Address.fromReedSolomonAddress(address);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isAlias(address: string): boolean {
    return /^[a-zA-Z0-9-_]{4,128}$/.test(address);
  }

  applyRecipientType(recipient: string): void {
    const r = recipient.trim();
    this.recipient.addressRaw = r;
    this.recipient.addressRS = '';
    this.recipient.status = RecipientValidationStatus.UNKNOWN;
    if (this.isReedSolomonAddress(r)) {
      this.recipient.type = RecipientType.ADDRESS;
    } else if (this.domainService.isUnstoppableDomain(r)) {
      this.recipient.type = RecipientType.UNSTOPPABLE;
    } else if (/^\d+$/.test(r)) {
      this.recipient.type = RecipientType.ID;
    } else if (this.isAlias(r)) {
      this.recipient.type = RecipientType.ALIAS;
    } else {
      this.recipient.type = RecipientType.UNKNOWN;
    }
  }

  async validateRecipient(recipient: string): Promise<void> {
    let accountFetchFn;
    this.recipient.addressRaw = recipient.trim();
    let id = this.recipient.addressRaw;
    switch (this.recipient.type) {
      case RecipientType.ALIAS:
        accountFetchFn = this.accountService.getAlias;
        break;
      case RecipientType.ADDRESS:
        const address = Address.fromReedSolomonAddress(id);
        this.recipient.addressRaw = address.getReedSolomonAddress();
        this.recipient.publicKey = address.getPublicKey();
        id = address.getNumericId();
        accountFetchFn = this.accountService.getAccount;
        break;
      case RecipientType.UNSTOPPABLE:
        try {
          id = await this.domainService.getUnstoppableAddress(id);
          accountFetchFn = this.accountService.getAccount;
          if (!id) {
            this.recipient.status = RecipientValidationStatus.INVALID;
          }
        } catch (e) {
          this.recipient.status = RecipientValidationStatus.UNSTOPPABLE_OUTAGE;
        }
        break;
      // tslint:disable-next-line:no-switch-case-fall-through
      case RecipientType.ID:
        accountFetchFn = this.accountService.getAccount;
        break;
      default:
      // no op
    }

    if (!accountFetchFn || !id) {
      return;
    }

    this.loading = true;

    accountFetchFn.call(this.accountService, id).then(({accountRS}) => {
      this.recipient.addressRS = accountRS;
      this.recipient.status = RecipientValidationStatus.VALID;
    }).catch(() => {
      if (this.isReedSolomonAddress(this.recipient.addressRaw)) {
        this.recipient.addressRS = this.recipient.addressRaw;
      } else if (this.recipient.type === RecipientType.UNSTOPPABLE) {
        this.recipient.addressRS = id;
      } else {
        const prefix = this.isTestNet ? AddressPrefix.TestNet : AddressPrefix.MainNet;
        this.recipient.addressRS = Address.fromNumericId(this.recipient.addressRaw, prefix).getReedSolomonAddress();
      }
      this.recipient.status = RecipientValidationStatus.INVALID;
    }).finally(() => {
      this.loading = false;
      this.recipientChange.emit(this.recipient);
    });

  }

  getRecipientTypeName = (): string => RecipientType[this.recipient.type];

  getValidationHint(): string {
    // TODO: localization
    switch (this.recipient.status) {
      case RecipientValidationStatus.UNKNOWN:
        return 'Address has not been verified.';
      case RecipientValidationStatus.VALID:
        return 'Address was successfully verified.';
      case RecipientValidationStatus.INVALID:
        return 'Please verify address before sending.';
      case RecipientValidationStatus.UNSTOPPABLE_OUTAGE:
        return 'Unable to fetch from the Unstoppable Domains API. Please try again later.';
    }
  }

  getValidationIcon(): string {
    switch (this.recipient.status) {
      case RecipientValidationStatus.UNKNOWN:
        return 'help_outline';
      case RecipientValidationStatus.VALID:
        return 'check_circle';
      case RecipientValidationStatus.INVALID:
      case RecipientValidationStatus.UNSTOPPABLE_OUTAGE:
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
    img.onload = async () => {
      // reduce the image by 1/4 to make it more reliable
      const width = Math.round(img.naturalWidth / 4),
        height = Math.round(img.naturalHeight / 4);

      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent): Promise<void> => {
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
          await this.validateRecipient(recipient);
          this.qrCodeUpload.emit({
            recipient: this.recipient,
            amountNQT: url.get('amountNQT'),
            feeNQT: url.get('feeNQT'),
            immutable: url.get('immutable') === 'true',
            feeSuggestionType: url.get('feeSuggestionType'),
            messageIsText: url.get('messageIsText') !== 'false',
            encrypt: false
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
