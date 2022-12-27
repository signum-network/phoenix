import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  SuggestedFees,
  TransactionAssetSubtype,
  TransactionType
} from '@signumjs/core';
import { Recipient, RecipientValidationStatus } from 'app/components/recipient-input/recipient-input.component';
import { AccountBalances, getBalancesFromAccount } from 'app/util/balance';
import { NgForm } from '@angular/forms';
import { Amount } from '@signumjs/util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WarnSendDialogComponent } from '../../../../components/warn-send-dialog/warn-send-dialog.component';
import { asNumber, isNotEmpty } from '../../../../util/forms';
import { I18nService } from '../../../../layout/components/i18n/i18n.service';
import { NotifierService } from 'angular-notifier';
import { ExceptionHandlerService } from '../../../../shared/services/exceptionhandler.service';
import { Router } from '@angular/router';
import { TokenData, TokenService } from '../../../../shared/services/token.service';
import { constants } from '../../../../constants';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-token-transfer-form',
  templateUrl: './token-transfer-form.component.html',
  styleUrls: ['./token-transfer-form.component.scss']
})
export class TokenTransferFormComponent implements OnInit {
  @ViewChild('transferForm', { static: true }) public transferForm: NgForm;
  @Input() account: WalletAccount;
  @Input() fees: SuggestedFees;
  @Input() token: TokenData;

  public recipient = new Recipient();
  public pin = '';
  public quantity = '';
  public isSubmitting = false;
  public fee: string;
  public immutable = false;
  public messageIsText = true;
  public encrypt = false;
  public showMessage = false;
  public message = '';
  public type = TransactionType.Asset;
  public subtype = TransactionAssetSubtype.AssetTransfer;

  private balances: AccountBalances;

  constructor(
    private warnDialog: MatDialog,
    private tokenService: TokenService,
    private i18nService: I18nService,
    private notifierService: NotifierService,
    private exceptionService: ExceptionHandlerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.balances = getBalancesFromAccount(this.account);
  }

  private openWarningDialog(recipients: Array<Recipient>): MatDialogRef<any> {
    return this.warnDialog.open(WarnSendDialogComponent, {
      width: '400px',
      data: recipients
    });
  }

  async transferToken(): Promise<void> {
    try {
      await this.tokenService.transferToken({
        keys: this.account.keys,
        pin: this.pin,
        token: this.token,
        quantity: asNumber(this.quantity, 0),
        recipient: this.recipient,
        fee: Amount.fromSigna(this.fee),
        isText: this.messageIsText,
        isEncrypted: this.encrypt,
        message: this.message
      });

      this.notifierService.notify('success',
        this.i18nService.getTranslation('success_transaction_executed')
      );
      this.reset();
      await this.router.navigate(['/']);
    } catch (e) {
      this.exceptionService.handle(e);
    }
  }

  async onSubmit(event): Promise<void> {

    event.stopImmediatePropagation();

    if (this.recipient.status !== RecipientValidationStatus.VALID) {
      const dialogRef = this.openWarningDialog([this.recipient]);
      dialogRef.afterClosed().subscribe(async ok => {
        if (ok) {
          await this.transferToken();
        }
      });
    } else {
      await this.transferToken();
    }
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }

  hasSufficientQuantity(): boolean {
    const quantity = parseFloat(this.quantity || '0');
    return quantity <= this.token.balance;
  }

  hasSufficientBalance(): boolean {
    const feeAmount = Amount.fromSigna(this.fee || 0);
    return this.balances.availableBalance.greaterOrEqual(feeAmount);
  }

  getQuantity(): number {
    const n = asNumber(this.quantity, 0);
    return Number.isNaN(n) ? 0 : n;
  }

  canSubmit(): boolean {
    return !Number.isNaN(this.getQuantity())
      && isNotEmpty(this.pin)
      && isNotEmpty(this.fee)
      && isNotEmpty(this.recipient.addressRaw)
      && this.hasSufficientQuantity()
      && this.hasSufficientBalance()
      && !this.isMessageTooLong()
      && this.recipient.status !== RecipientValidationStatus.INVALID;
  }

  setPin(pin: string): void {
    this.pin = pin;
  }

  isMessageTooLong(): boolean {
    return this.message && this.message.length > 1000;
  }

  getErrorHint(): string {
    if (!this.hasSufficientBalance()) {
      return this.i18nService.getTranslation('error_not_enough_funds');
    }
    if (!this.hasSufficientQuantity()) {
      return this.i18nService.getTranslation('error_not_enough_assets');
    }
    if (this.isMessageTooLong()) {
      return this.i18nService.getTranslation('message_too_long');
    }
    if (this.recipient.status === RecipientValidationStatus.INVALID) {
      return this.i18nService.getTranslation('invalid_address');
    }
    if (this.recipient.status === RecipientValidationStatus.BURN) {
      return this.i18nService.getTranslation('burn_address');
    }
    if (this.recipient.status === RecipientValidationStatus.UNKNOWN) {
      return this.i18nService.getTranslation('unknown_address');
    }
    if (Number.isNaN(this.getQuantity())) {
      return this.i18nService.getTranslation('csv_error_invalid_amount');
    }
    return '';
  }

  private reset(): void {
    this.recipient = new Recipient();
    this.pin = '';
    this.quantity = '';
    this.isSubmitting = false;
    this.fee = '';
    this.immutable = false;
    this.messageIsText = true;
    this.encrypt = false;
    this.showMessage = false;
    this.message = '';
  }

  canEncrypt(): boolean {
    return this.recipient.publicKey && this.recipient.publicKey !== constants.smartContractPublicKey;
  }
}
