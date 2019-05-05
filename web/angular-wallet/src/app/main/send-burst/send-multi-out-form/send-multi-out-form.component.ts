import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {convertNumberToNQTString, burstAddressPattern, convertAddressToNumericId, isBurstAddress} from '@burstjs/util';
import {NgForm} from '@angular/forms';
import {SuggestedFees, Account} from '@burstjs/core';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/layout/components/i18n/i18n.service';


const isNotEmpty = (value: string) => value && value.length > 0;

interface MultioutRecipient {
  amountNQT: string;
  addressRS: string;
}

@Component({
  selector: 'app-send-multi-out-form',
  templateUrl: './send-multi-out-form.component.html',
  styleUrls: ['./send-multi-out-form.component.scss']
})
export class SendMultiOutFormComponent implements OnInit {

  @ViewChild('sendBurstForm') public sendBurstForm: NgForm;
  public feeNQT: string;
  @ViewChild('recipientAddress') public recipientAddress: string;
  @ViewChild('amountNQT') public amountNQT: string;
  @ViewChild('message') public message: string;
  @ViewChild('fullHash') public fullHash: string;
  @ViewChild('encrypt') public encrypt: string;
  @ViewChild('pin') public pin: string;

  @ViewChild('recipients') public recipients: MultioutRecipient[];

  @Input('account') account: Account;
  @Input('fees') fees: SuggestedFees;

  sameAmount = false;
  advanced = false;
  showMessage = false;
  burstAddressPatternRef = burstAddressPattern;

  deadline = '24';
  isSending = false;

  constructor(private transactionService: TransactionService,
              private notifierService: NotifierService,
              private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.recipients = [this.createRecipient()];
  }

  async onSubmit(event): Promise<void> {
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

  getMultiOutString(): string {
    return this
      .pruneRecipients()
      .map(recipient =>
        this.sameAmount
          ? convertAddressToNumericId(recipient.addressRS)
          : `${convertAddressToNumericId(recipient.addressRS)}:${convertNumberToNQTString(parseFloat(recipient.amountNQT))}`
      ).join(';');
  }

  trackByIndex(index): number {
    return index;
  }

  createRecipient(): MultioutRecipient {
    return {
      amountNQT: '',
      addressRS: ''
    };
  }

  toggleSameAmount(): void {
    this.sameAmount = !this.sameAmount;
  }

  addRecipient(event): void {
    this.recipients.push(this.createRecipient());
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private getTotalForMultiOut(): number {
    return this.pruneRecipients()
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

  private pruneRecipients(): Array<MultioutRecipient>{
    return this.recipients.filter(
        r => r.amountNQT !== '' || r.addressRS !== ''
    );
  }

  canSubmit(): boolean {

    const validRecipients = this
      .pruneRecipients()
      .reduce(
        (isValid, recipient) => isValid
          && isBurstAddress(recipient.addressRS)
          && (!this.sameAmount ? recipient.amountNQT && recipient.amountNQT.length > 0 : true)
        , true);

    return validRecipients &&
      isNotEmpty(this.pin) &&
      (this.sameAmount ? isNotEmpty(this.amountNQT) : true);

  }

  onRecipientChange($event: string, i: number): void {
    this.recipients[i].addressRS = $event;
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
