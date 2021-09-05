import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Account, SuggestedFees} from '@signumjs/core';
import {QRData, Recipient, RecipientValidationStatus} from 'app/components/recipient-input/recipient-input.component';
import {AccountBalances, getBalancesFromAccount} from 'app/util/balance';
import {TokenData, TokenService} from '../../token.service';
import {NgForm} from '@angular/forms';
import {Amount} from '@signumjs/util';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WarnSendDialogComponent} from '../../../../components/warn-send-dialog/warn-send-dialog.component';
import {asNumber, isNotEmpty} from '../../../../util/forms';
import {I18nService} from '../../../../layout/components/i18n/i18n.service';

@Component({
  selector: 'app-token-transfer-form',
  templateUrl: './token-transfer-form.component.html',
  styleUrls: ['./token-transfer-form.component.scss']
})
export class TokenTransferFormComponent implements OnInit {
  @ViewChild('transferForm', {static: true}) public transferForm: NgForm;
  @Input() account: Account;
  @Input() fees: SuggestedFees;
  @Input() token: TokenData;

  public recipient = new Recipient();
  public pin = '';
  public quantity = '';
  public isSubmitting = false;
  public fee: number;
  public immutable = false;
  public messageIsText = true;
  public encrypt = false;
  public showMessage = false;
  public message = '';

  private balances: AccountBalances;

  constructor(
    private warnDialog: MatDialog,
    private tokenService: TokenService,
    private i18nService: I18nService,
  ) {
  }

  ngOnInit(): void {
    this.fee = this.fees.standard;
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
    } catch (e) {

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
        this.transferForm.reset();
      });
    } else {
      await this.transferToken();
      this.transferForm.reset();
    }
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }

  onQRUpload($event: QRData): void {
    // do we need this?
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
    return  asNumber(this.quantity, 0);
  }

  canSubmit(): boolean {
    return !Number.isNaN(this.getQuantity())
      && isNotEmpty(this.pin)
      && isNotEmpty(this.fee.toString(10))
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
    if (this.recipient.status === RecipientValidationStatus.UNKNOWN) {
      return this.i18nService.getTranslation('unknown_address');
    }
    if (Number.isNaN(this.getQuantity())) {
      return this.i18nService.getTranslation('csv_error_invalid_amount');
    }
    return '';
  }
}
