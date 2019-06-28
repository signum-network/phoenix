import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {
  convertNumberToNQTString,
  burstAddressPattern,
  convertAddressToNumericId,
  convertNQTStringToNumber
} from '@burstjs/util';
import {SuggestedFees, Account, TransactionId} from '@burstjs/core';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
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

  @ViewChild('sendBurstForm', {static: true}) public sendBurstForm: NgForm;
  public fee: string;
  @ViewChild('recipientAddress', {static: false}) public recipientAddress: string;
  @ViewChild('amountNQT', {static: true}) public amount: string;
  @ViewChild('message', {static: false}) public message: string;
  @ViewChild('fullHash', {static: false}) public fullHash: string;
  @ViewChild('encrypt', {static: false}) public encrypt: string;
  @ViewChild('pin', {static: true}) public pin: string;

  @ViewChild('recipients', {static: true}) public recipients: Array<Recipient> = [];

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

  private async sendBurstSameAmount(): Promise<void> {
    const request = {
      recipientIds: this.recipients.map(r => convertAddressToNumericId(r.addressRS)),
      fee: convertNumberToNQTString(parseFloat(this.fee)),
      amount: convertNumberToNQTString(parseFloat(this.amount)),
      pin: this.pin,
      keys: this.account.keys,
    };
    await this.transactionService.sendSameBurstToMultipleRecipients(request);
  }

  private async sendBurstArbitraryAmount(): Promise<void> {
    const request = {
      recipientAmounts: this.recipients.map(r => ({
        recipient: convertAddressToNumericId(r.addressRS),
        amountNQT: convertNumberToNQTString(parseFloat(r.amount))
      })),
      fee: convertNumberToNQTString(parseFloat(this.fee)),
      pin: this.pin,
      keys: this.account.keys,
    };
    await this.transactionService.sendBurstToMultipleRecipients(request);
  }


  private async sendBurst(): Promise<void> {
    this.isSending = true;
    try {
      // FIXME: implement arbitrary amounts
      if(this.sameAmount){
        this.sendBurstSameAmount();
      }
      else {
        this.sendBurstArbitraryAmount();
      }
      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      this.sendBurstForm.resetForm();
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
    }
    this.isSending = false;
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
      .map(({amount}) => parseFloat(amount) || 0)
      .reduce((acc, curr) => acc + curr, 0);
  }

  private getTotalForSameAmount(): number {
    return parseFloat(this.amount) * this.recipients.length;
  }

  getTotal(): number {
    const calculateAmount = this.sameAmount ? this.getTotalForSameAmount() : this.getTotalForMultiOut();
    return calculateAmount + parseFloat(this.fee) || 0;
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
    return convertNQTStringToNumber(this.account.balanceNQT) - this.getTotal() > Number.EPSILON;
  }


  canSubmit(): boolean {

    const hasCompletedRecipients = this
      .nonEmptyRecipients()
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
    this.recipients[i] = recipient;
  }
}
