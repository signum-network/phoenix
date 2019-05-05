import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {convertAddressToNumericId} from '@burstjs/util';
import {AccountService} from '../../../setup/account/account.service';

enum RecipientType {
  UNKNOWN = 0,
  ADDRESS = 1,
  ID,
  ALIAS,
}

enum ValidationStatus {
  UNKNOWN = 'unknown',
  INVALID = 'invalid',
  VALID = 'valid',
}


@Component({
  selector: 'burst-recipient-input',
  templateUrl: './burst-recipient-input.component.html',
  styleUrls: ['./burst-recipient-input.component.scss']
})
export class BurstRecipientInputComponent implements OnInit {
  recipientTypeValidationStatus = ValidationStatus.UNKNOWN;
  recipientType = RecipientType.UNKNOWN;
  recipientValue = '';
  recipientRS = '';

  @Output()
  recipientChange = new EventEmitter();

  set recipient(r: string) {
    this.recipientValue = r;
  }

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  applyRecipientType(recipient: string): void {
    this.recipientRS = '';
    this.recipientTypeValidationStatus = ValidationStatus.UNKNOWN;
    const r = recipient.trim();
    if (r.length === 0) {
      this.recipientType = RecipientType.UNKNOWN;
    } else if (r.startsWith('BURST-')) {
      this.recipientType = RecipientType.ADDRESS;
    } else if (/^\d+$/.test(r)) {
      this.recipientType = RecipientType.ID;
    } else {
      this.recipientType = RecipientType.ALIAS;
    }
  }


  validateRecipient(): void {
    let accountFetchFn;
    let id = this.recipientValue.trim();
    switch (this.recipientType) {
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
      this.recipientRS = accountRS;
      this.recipientTypeValidationStatus = ValidationStatus.VALID;
    }).catch(() => {
      this.recipientRS = '';
      this.recipientTypeValidationStatus = ValidationStatus.INVALID;
    }).finally(() => {
        this.recipientChange.emit({
          status: this.recipientTypeValidationStatus,
          accountRS: this.recipientRS,
          accountRaw: this.recipientValue
        });
      }
    );

  }

  getRecipientTypeName = (): string => RecipientType[this.recipientType];

  getValidationHint(): string {
    // TODO: localization
    switch (this.recipientTypeValidationStatus) {
      case ValidationStatus.UNKNOWN:
        return 'The address was not validated yet';
      case ValidationStatus.VALID:
        return 'Address was successfully verified';
      case ValidationStatus.INVALID:
        return 'This address does not seem valid. Verify if it really exists!';
    }
  }

  getValidationIcon(): string {
    switch (this.recipientTypeValidationStatus) {
      case ValidationStatus.UNKNOWN:
        return 'help_outline';
      case ValidationStatus.VALID:
        return 'check_circle';
      case ValidationStatus.INVALID:
        return 'error_outline';
    }
  }

  getValidationClass(): string {
    return 'badge ' + this.recipientTypeValidationStatus.toString().toLocaleLowerCase();
  }
}
