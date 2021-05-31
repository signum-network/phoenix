import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {Amount} from '@burstjs/util';
import {SuggestedFees, Account, MultioutRecipientAmount, Address, AddressPrefix} from '@burstjs/core';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WarnSendDialogComponent} from '../warn-send-dialog/warn-send-dialog.component';
import {Recipient} from '../../../layout/components/burst-recipient-input/burst-recipient-input.component';
import {filter, takeUntil} from 'rxjs/operators';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from 'app/util/UnsubscribeOnDestroy';
import {BatchRecipientsDialogComponent} from '../batch-recipients-dialog/batch-recipients-dialog.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {constants} from '../../../constants';
import {Router} from '@angular/router';
import {AccountBalances, getBalancesFromAccount} from '../../../util/balance';
import {isKeyDecryptionError} from '../../../util/exceptions/isKeyDecryptionError';
import {NetworkService} from '../../../network/network.service';

const isNotEmpty = (value: string) => value && value.length > 0;

@Component({
  selector: 'app-send-multi-out-form',
  templateUrl: './send-multi-out-form.component.html',
  styleUrls: ['./send-multi-out-form.component.scss']
})
export class SendMultiOutFormComponent extends UnsubscribeOnDestroy implements OnInit {

  @ViewChild('sendBurstForm', {static: true}) public sendBurstForm: NgForm;
  @ViewChild('recipientAddress', {static: false}) public recipientAddress: string;
  @ViewChild('amount', {static: true}) public amount: string;
  @ViewChild('message', {static: false}) public message: string;
  @ViewChild('fullHash', {static: false}) public fullHash: string;
  @ViewChild('encrypt', {static: false}) public encrypt: string;
  @ViewChild('pin', {static: true}) public pin: string;

  @ViewChild('recipients', {static: true}) public recipients: Array<Recipient> = [];

  @Input('account') account: Account;
  @Input('fees') fees: SuggestedFees;

  fee: string;
  sameAmount = false;
  advanced = false;
  showMessage = false;

  deadline = '24';
  isSending = false;
  language: string;
  private balances: AccountBalances;

  constructor(
    private warnDialog: MatDialog,
    private batchRecipientsDialog: MatDialog,
    private transactionService: TransactionService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private storeService: StoreService,
    private networkService: NetworkService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    super();
    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async ({language}) => {
          this.language = language;
        }
      );
  }

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
          this.sendBurst();
        }
      });
    } else {
      this.sendBurst();
    }
  }

  private async sendBurstSameAmount(): Promise<void> {

    const fee = Amount.fromSigna(this.fee || 0);
    const amount = Amount.fromSigna(this.amount || 0);

    const request = {
      recipientIds: this.recipients.map(r => Address.fromReedSolomonAddress(r.addressRS).getNumericId()),
      fee: fee.getPlanck(),
      amountNQT: amount.getPlanck(),
      pin: this.pin,
      keys: this.account.keys,
    };
    await this.transactionService.sendSameBurstToMultipleRecipients(request);
  }

  private async sendBurstArbitraryAmount(): Promise<void> {

    const fee = Amount.fromSigna(this.fee || 0);

    const request = {
      recipientAmounts: this.recipients.map(r => ({
        recipient: Address.fromReedSolomonAddress(r.addressRS).getNumericId(),
        amountNQT: Amount.fromSigna(r.amount || 0).getPlanck(),
      })),
      fee: fee.getPlanck(),
      pin: this.pin,
      keys: this.account.keys,
    };
    await this.transactionService.sendBurstToMultipleRecipients(request);
  }


  private async sendBurst(): Promise<void> {
    if (!this.nonEmptyRecipients().length) {
      return;
    }

    this.isSending = true;
    try {
      if (this.sameAmount) {
        await this.sendBurstSameAmount();
      } else {
        await this.sendBurstArbitraryAmount();
      }
      this.sendBurstForm.resetForm();
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
      r => r.amount !== '' || r.addressRS !== ''
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
  }

  private handleBatchRecipients(recipientAmounts: MultioutRecipientAmount[]): void {

    let previousAmount = null;
    let isSameAmount = true;

    const prefix = this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet;

    this.recipients = recipientAmounts.map(ra => {
      const r = new Recipient();
      r.amount = Amount.fromPlanck(ra.amountNQT).getSigna();
      r.addressRaw = ra.recipient;
      r.addressRS = Address.fromNumericId(ra.recipient, prefix).getReedSolomonAddress();

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
