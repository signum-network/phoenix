import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Account, SuggestedFees} from '@signumjs/core';
import {QRData, Recipient, RecipientValidationStatus} from 'app/components/recipient-input/recipient-input.component';
import {AccountBalances, getBalancesFromAccount} from 'app/util/balance';
import {TokenData, TokenService} from '../../token.service';
import {NgForm} from '@angular/forms';
import {Amount} from '@signumjs/util';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WarnSendDialogComponent} from '../../../../components/warn-send-dialog/warn-send-dialog.component';
import {isNotEmpty} from '../../../../util/forms';

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

  private balances: AccountBalances;

  constructor(
    private warnDialog: MatDialog,
    private tokenService: TokenService,
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
        tokenId: this.token.id,
        quantity: this.quantity,
        recipient: this.recipient,
        fee: Amount.fromSigna(this.fee)
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
          console.log('sending.', this.quantity);
          await this.transferToken();
        }
        this.transferForm.reset();
      });
    } else {
      console.log('sending...', this.quantity);
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

  canSubmit(): boolean {
    return isNotEmpty(this.quantity)
      && isNotEmpty(this.fee.toString(10))
      && isNotEmpty(this.recipient.addressRaw)
      && this.hasSufficientQuantity()
      && this.hasSufficientBalance();
  }

  setPin(pin: string): void {
    this.pin = pin;
  }
}
