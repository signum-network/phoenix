import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {convertNumberToNQTString, burstAddressPattern, convertAddressToNumericId} from '@burstjs/util';
import {SuggestedFees, Account} from '@burstjs/core';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {WarnSendDialogComponent} from '../warn-send-dialog/warn-send-dialog.component';
import {Recipient} from '../../../layout/components/burst-recipient-input/burst-recipient-input.component';
import {takeUntil} from 'rxjs/operators';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';

const isNotEmpty = (value: string) => value && value.length > 0;

@Component({
  selector: 'app-send-multi-out-form',
  templateUrl: './send-multi-out-form.component.html',
  styleUrls: ['./send-multi-out-form.component.scss']
})
export class SendMultiOutFormComponent extends UnsubscribeOnDestroy implements OnInit {

  @ViewChild('sendBurstForm') public sendBurstForm: NgForm;
  public feeNQT: string;
  @ViewChild('recipientAddress') public recipientAddress: string;
  @ViewChild('amountNQT') public amountNQT: string;
  @ViewChild('message') public message: string;
  @ViewChild('fullHash') public fullHash: string;
  @ViewChild('encrypt') public encrypt: string;
  @ViewChild('pin') public pin: string;

  @ViewChild('recipients') public recipients: Array<Recipient>;

  @Input('account') account: Account;
  @Input('fees') fees: SuggestedFees;

  sameAmount = false;
  advanced = false;
  showMessage = false;
  burstAddressPatternRef = burstAddressPattern;

  deadline = '24';
  isSending = false;
  language: string;

  constructor(
    private warnDialog: MatDialog,
    private transactionService: TransactionService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private storeService: StoreService,
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
    this.recipients = new Array<Recipient>();
    this.recipients.push(new Recipient());
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

  private async sendBurst(): Promise<void> {
    this.isSending = true;
    event.stopImmediatePropagation();
    const multiOutString = this.getMultiOutString();

    try {
      await this.transactionService.sendMoneyMultiOut({
        transaction: {
          recipients: multiOutString,
          feeNQT: this.feeNQT,
          deadline: parseInt(this.deadline, 10) * 60,
          amountNQT: this.getTotal().toString()
        },
        pin: this.pin,
        keys: this.account.keys,
        sameAmount: this.sameAmount
      });

      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      this.sendBurstForm.resetForm();
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
    }
    this.isSending = false;
  }

  private getMultiOutString(): string {
    return this
      .nonEmptyRecipients()
      .map(recipient =>
        this.sameAmount
          ? convertAddressToNumericId(recipient.addressRS)
          : `${convertAddressToNumericId(recipient.addressRS)}:${convertNumberToNQTString(parseFloat(recipient.amountNQT))}`
      ).join(';');
  }

  private openWarningDialog(recipients: Array<Recipient>): MatDialogRef<any> {
    return this.warnDialog.open(WarnSendDialogComponent, {
      width: '400px',
      data: recipients
    });
  }

  trackByIndex(index): number {
    return index;
  }

  toggleSameAmount(): void {
    this.sameAmount = !this.sameAmount;
  }

  addRecipient(event): void {
    this.recipients.push(new Recipient());
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private getTotalForMultiOut(): number {
    return this.nonEmptyRecipients()
      .map(({amountNQT}) => parseFloat(amountNQT) || 0)
      .reduce((acc, curr) => acc + curr, 0);
  }

  private getTotalForSameAmount(): number {
    return parseFloat(this.amountNQT) * this.recipients.length;
  }

  getTotal(): number {
    const calculateAmount = this.sameAmount ? this.getTotalForSameAmount() : this.getTotalForMultiOut();
    return calculateAmount + parseFloat(this.feeNQT) || 0;
  }

  private nonEmptyRecipients(): Array<Recipient> {
    return this.recipients.filter(
      r => r.amountNQT !== '' || r.addressRS !== ''
    );
  }

  getNonValidAccounts(): Array<Recipient> {
    return this.nonEmptyRecipients().filter(({status}) => status !== 'valid');
  }

  canSubmit(): boolean {

    const hasCompletedRecipients = this
      .nonEmptyRecipients()
      .reduce(
        (isComplete, recipient) => isComplete
          && (!this.sameAmount ? recipient.amountNQT && recipient.amountNQT.length > 0 : true)
        , true);

    return hasCompletedRecipients &&
      isNotEmpty(this.pin) &&
      (this.sameAmount ? isNotEmpty(this.amountNQT) : true);

  }

  onRecipientChange(recipient: Recipient, i: number): void {
    this.recipients[i] = recipient;
  }

  // todo: make it work
  // onDeleteRecipient(i: number) {
  //   if (this.recipients.length > 1) {
  //
  //     this.recipients = this.recipients.filter((r, x) => x !== i)
  //     event.stopImmediatePropagation();
  //     event.preventDefault();
  //
  //   }
  // }
}
