import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TransactionService } from 'app/main/transactions/transaction.service';
import { convertNumberToNQTString, burstAddressPattern, convertAddressToNumericId } from '@burstjs/util';
import { NgForm } from '@angular/forms';
import { SuggestedFees, Account } from '@burstjs/core';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';

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

  @ViewChild('recipients') public recipients: any[];

  @Input('account') account: Account;
  @Input('fees') fees: SuggestedFees;

  sameAmount = false;
  advanced = false;
  showMessage = false;
  burstAddressPatternRef = burstAddressPattern;

  deadline = '24';

  constructor(private transactionService: TransactionService,
    private notifierService: NotifierService,
    private i18nService: I18nService) { }

  ngOnInit() {
    this.recipients = [this.createRecipient(), this.createRecipient()];
  }

  async onSubmit(event) {
    event.stopImmediatePropagation();

    const multiOutString = this.getMultiOutString();

    try {
      await this.transactionService.sendMoneyMultiOut({
        transaction: {
          recipients: multiOutString,
          feeNQT: this.feeNQT,
          deadline: parseInt(this.deadline) * 60,
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
  }

  getMultiOutString() {
    if (this.sameAmount) {
      return this.recipients.map((recipient) => 
        `${(`BURST-${recipient.addressRS}`)}`)
        .join(';');
    } else {
      return this.recipients.map((recipient) => 
        `${convertAddressToNumericId(`BURST-${recipient.addressRS}`)}:${convertNumberToNQTString(parseFloat(recipient.amountNQT))}`)
        .join(';');
    }
  }

  createRecipient() {
    return { 
      amountNQT:'', 
      addressRS:''
    };
  }

  toggleSameAmount() {
    this.sameAmount = !this.sameAmount;
  }

  addRecipient(event) {
    this.recipients.push(this.createRecipient());
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  getTotal() {
    const calculateMultiOutTotal = this.recipients.map((recipient) => {
      return parseFloat(recipient.amountNQT) || 0;
    }).reduce((acc, curr) => acc + curr, 0);

    return this.sameAmount ? parseFloat(this.amountNQT) + parseFloat(this.feeNQT) || 0
      : calculateMultiOutTotal + parseFloat(this.feeNQT) || 0;
  }
}
