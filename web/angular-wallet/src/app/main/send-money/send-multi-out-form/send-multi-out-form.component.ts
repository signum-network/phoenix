import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Amount } from '@signumjs/util';
import {
  MultioutRecipientAmount,
  SuggestedFees,
  TransactionPaymentSubtype,
  TransactionType
} from '@signumjs/core';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { StoreService } from '../../../store/store.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { BatchRecipientsDialogComponent } from '../batch-recipients-dialog/batch-recipients-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { constants } from '../../../constants';
import { Router } from '@angular/router';
import { AccountBalances, getBalancesFromAccount } from '../../../util/balance';
import { isKeyDecryptionError } from '../../../util/exceptions/isKeyDecryptionError';
import { Recipient } from 'app/components/recipient-input/recipient-input.component';
import { WarnSendDialogComponent } from '../../../components/warn-send-dialog/warn-send-dialog.component';
import { memoize } from 'lodash';
import { WalletAccount } from 'app/util/WalletAccount';
import { SendMoneyService } from '../send-money.service';

const isNotEmpty = (value: string) => value && value.length > 0;

@Component({
  selector: 'app-send-multi-out-form',
  templateUrl: './send-multi-out-form.component.html',
  styleUrls: ['./send-multi-out-form.component.scss']
})
export class SendMultiOutFormComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(
    private warnDialog: MatDialog,
    private batchRecipientsDialog: MatDialog,
    private sendMoneyService: SendMoneyService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private storeService: StoreService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    super();
    this.storeService.settingsUpdated$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async ({language}) => {
          this.language = language;
        }
      );
  }

  @ViewChild('sendForm', {static: true}) public sendForm: NgForm;
  @ViewChild('recipientAddress', {static: false}) public recipientAddress: string;
  @ViewChild('amount', {static: true}) public amount: string;
  @ViewChild('message', {static: false}) public message: string;
  @ViewChild('fullHash', {static: false}) public fullHash: string;
  @ViewChild('encrypt', {static: false}) public encrypt: string;
  @ViewChild('pin', {static: true}) public pin: string;
  @ViewChild('fee', { static: true }) public fee: string;

  @ViewChild('recipients', {static: true}) public recipients: Array<Recipient> = [];

  @Input() account: WalletAccount;
  @Input() fees: SuggestedFees;

  sameAmount = false;
  advanced = false;
  showMessage = false;

  deadline = '24';
  isSending = false;
  language: string;
  private balances: AccountBalances;
  type = TransactionType.Payment;
  subtype = this.sameAmount ? TransactionPaymentSubtype.MultiOutSameAmount : TransactionPaymentSubtype.MultiOut;

  public getPayloadLength = memoize(this.calculatePayloadLength.bind(this),
      () => {
      return `${this.recipients.length}-${this.sameAmount ? 'same' : 'unsame'}`;
    });

  ngOnInit(): void {
    this.balances = getBalancesFromAccount(this.account);
    this.resetRecipients();
  }

  onSubmit(event): void {
    event.stopImmediatePropagation();

    const nonValidAccounts = this.getNonValidAccounts();
    if (nonValidAccounts.length > 0) {
      const dialogRef = this.openWarningDialog(nonValidAccounts);
      dialogRef.afterClosed().subscribe(ok => {
        if (ok) {
          this.sendMoney();
        }
      });
    } else {
      this.sendMoney();
    }
  }

  private async sendMoneySameAmount(): Promise<void> {

    const fee = Amount.fromSigna(this.fee || 0);
    const amount = Amount.fromSigna(this.amount || 0);

    const request = {
      recipientIds: this.recipients.map(r => r.addressId),
      fee: fee.getPlanck(),
      amountNQT: amount.getPlanck(),
      pin: this.pin,
      keys: this.account.keys,
    };
    await this.sendMoneyService.sendSameAmountToMultipleRecipients(request);
  }

  private async sendMoneyArbitraryAmount(): Promise<void> {

    const fee = Amount.fromSigna(this.fee || 0);

    const request = {
      recipientAmounts: this.recipients.map(r => ({
        recipient: r.addressId,
        amountNQT: Amount.fromSigna(r.amount || 0).getPlanck(),
      })),
      fee: fee.getPlanck(),
      pin: this.pin,
      keys: this.account.keys,
    };
    await this.sendMoneyService.sendAmountToMultipleRecipients(request);
  }


  private async sendMoney(): Promise<void> {
    if (!this.nonEmptyRecipients().length) {
      return;
    }

    this.isSending = true;
    try {
      if (this.sameAmount) {
        await this.sendMoneySameAmount();
      } else {
        await this.sendMoneyArbitraryAmount();
      }
      this.sendForm.resetForm();
      this.resetRecipients();
      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      await this.router.navigate(['/']);
    } catch (e) {
      if (isKeyDecryptionError(e)) {
        this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
      } else {
        this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
      }
    }
    this.isSending = false;
  }

  private openWarningDialog(recipients: Array<Recipient>): MatDialogRef<any> {
    const width = this.breakpointObserver.isMatched(Breakpoints.Handset) ? '90%' : '50%';
    return this.warnDialog.open(WarnSendDialogComponent, {
      width,
      data: recipients
    });
  }

  private openBatchRecipientsDialog(): MatDialogRef<any> {
    const width = this.breakpointObserver.isMatched(Breakpoints.Handset) ? '90%' : '50%';
    return this.batchRecipientsDialog.open(BatchRecipientsDialogComponent, {width});
  }

  trackByIndex(index): number {
    return index;
  }

  addRecipient(event): void {
    this.recipients.push(new Recipient());
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  clearRecipients(): void {
    this.recipients = [];
  }

  addBatchedRecipient(event: MouseEvent): void {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.openBatchRecipientsDialog()
      .afterClosed()
      .pipe(
        filter(recipientAmounts => recipientAmounts && recipientAmounts.length > 0)
      )
      .subscribe(this.handleBatchRecipients.bind(this));
  }

  private calculatePayloadLength(): number {
    return this.recipients.reduce(
      (len, r) => {
        if (!r.addressId) {
          return len;
        }
        // format is <id1>;<id2>;
        len += r.addressId.length + 1;
        if (!this.sameAmount) {
          // format is <id1>:<amount>;<id2>:<amount>;
          len += Amount.fromSigna(r.amount || '0').getPlanck().length + 1;
        }
        return len;
      }, 0);
  }

  private getTotalForMultiOut(): Amount {
    return this.nonEmptyRecipients()
      .map(({amount}) => Amount.fromSigna(amount || 0))
      .reduce((acc, curr) => acc.add(curr), Amount.Zero());
  }

  private getTotalForSameAmount(): Amount {
    return Amount.fromSigna(this.amount || 0).multiply(this.recipients.length);
  }

  getTotal(): Amount {
    const total = this.sameAmount ? this.getTotalForSameAmount() : this.getTotalForMultiOut();
    return total.add(Amount.fromSigna(this.fee || 0));
  }

  private nonEmptyRecipients(): Array<Recipient> {
    return this.recipients.filter(
      r => r.amount !== '' || r.addressId !== ''
    );
  }

  getNonValidAccounts(): Array<Recipient> {
    return this.nonEmptyRecipients().filter(({status}) => status !== 'valid');
  }

  hasSufficientBalance(): boolean {
    const available = this.balances.availableBalance.clone();
    const total = this.getTotal();

    return available.subtract(total).greaterOrEqual(Amount.Zero());
  }


  canSubmit(): boolean {

    const nonEmptyRecipients = this.nonEmptyRecipients();

    if (nonEmptyRecipients.length < 2) {
      return false;
    }

    if (this.hasRecipientsExceeded()) {
      return false;
    }

    const hasCompletedRecipients = nonEmptyRecipients
      .reduce(
        (isComplete, recipient) => isComplete
          && (!this.sameAmount ? recipient.amount && recipient.amount.length > 0 : true)
        , true);

    return hasCompletedRecipients
      && this.hasSufficientBalance()
      && isNotEmpty(this.pin)
      && (this.sameAmount ? isNotEmpty(this.amount) : true);

  }

  onRecipientChange(recipient: Recipient, i: number): void {
    const amount = this.recipients[i].amount;
    this.recipients[i] = {
      ...recipient,
      amount
    };
    this.calculatePayloadLength();
  }

  private handleBatchRecipients(recipientAmounts: MultioutRecipientAmount[]): void {

    let previousAmount = null;
    let isSameAmount = true;

    this.recipients = recipientAmounts.map(ra => {
      const r = new Recipient();
      r.amount = Amount.fromPlanck(ra.amountNQT).getSigna();
      r.addressRaw = ra.recipient;

      if (previousAmount) {
        isSameAmount = isSameAmount && (previousAmount === r.amount);
      }
      previousAmount = r.amount;
      return r;
    });

    if (isSameAmount) {
      this.sameAmount = isSameAmount;
      this.amount = previousAmount;
    }
  }

  resetRecipients(): void {
    this.clearRecipients();
    this.recipients.push(new Recipient());
  }

  private getMaxAllowedRecipients(): number {
    return this.sameAmount ? constants.maxRecipientsSameMultiout : constants.maxRecipientsMultiout;
  }

  hasRecipientsExceeded(): boolean {
    return this.nonEmptyRecipients().length > this.getMaxAllowedRecipients();
  }

  getRecipientCounter(): string {
    return `${this.nonEmptyRecipients().length}/${this.getMaxAllowedRecipients()} ${this.i18nService.getTranslation('recipients')}`;
  }

  isLastRecipientItem(index: number): boolean {
    return this.recipients.length - 1 === index;
  }

  removeRecipientItem(index: number): void {
    if (this.recipients.length > 1) {
      this.recipients.splice(index, 1);
    }
  }
}
