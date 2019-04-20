import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {SuggestedFees, Account, EncryptedMessage} from '@burstjs/core';
import {burstAddressPattern, isBurstAddress} from '@burstjs/util';
import {NgForm} from '@angular/forms';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/layout/components/i18n/i18n.service';


const isNotEmpty = (value: string) => value && value.length > 0;

@Component({
  selector: 'app-send-burst-form',
  templateUrl: './send-burst-form.component.html',
  styleUrls: ['./send-burst-form.component.scss']
})
export class SendBurstFormComponent implements OnInit {
  @ViewChild('sendBurstForm') public sendBurstForm: NgForm;
  @ViewChild('recipientAddress') public recipientAddress: string;
  @ViewChild('amountNQT') public amountNQT: string;
  @ViewChild('message') public message: string;
  @ViewChild('fullHash') public fullHash: string;
  @ViewChild('encrypt') public encrypt: string;
  @ViewChild('pin') public pin: string;

  @Input('account') account: Account;
  @Input('fees') fees: SuggestedFees;

  advanced = false;
  showMessage = false;
  burstAddressPatternRef = burstAddressPattern;
  deadline = '24';

  public feeNQT: string;
  isSending = false;

  constructor(
    private transactionService: TransactionService,
    private notifierService: NotifierService,
    private i18nService: I18nService) {
  }

  ngOnInit(): void {
  }

  getTotal(): number {
    return parseFloat(this.amountNQT) + parseFloat(this.feeNQT) || 0;
  }

  async onSubmit(event): Promise<void> {
    event.stopImmediatePropagation();

    try {
      this.isSending = true;
      await this.transactionService.sendMoney({
        transaction: {
          amountNQT: this.amountNQT,
          feeNQT: this.feeNQT,
          attachment: this.getMessage(),
          deadline: parseFloat(this.deadline) * 60,
          fullHash: this.fullHash,
          type: 1
        },
        pin: this.pin,
        keys: this.account.keys,
        recipientAddress: `BURST-${this.recipientAddress}`
      });

      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      this.sendBurstForm.resetForm();
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
    }
    this.isSending = false;
  }


  getMessage(): any {

    if (!this.message) {
      return null;
    }

    return this.encrypt ? {
      data: this.message,
      nonce: null,
      isText: true
    } : {
      message: this.message,
      type: 'message',
      messageIsText: true
    };
  }


  canSubmit(): boolean {
    return isBurstAddress(`BURST-${this.recipientAddress}`) &&
      isNotEmpty(this.amountNQT) &&
      isNotEmpty(this.pin);
  }
}
