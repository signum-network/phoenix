import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { burstAddressPattern } from '@burstjs/util';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'app/main/transactions/transaction.service';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';

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

  constructor(
    private transactionService: TransactionService,
    private notifierService: NotifierService,
    private i18nService: I18nService) {
  }

  ngOnInit() {}

  getTotal() {
    return parseFloat(this.amountNQT) + parseFloat(this.feeNQT) || 0;
  }

  async onSubmit(event) {
    event.stopImmediatePropagation();

    try {
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
    } catch(e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
    } 
  }


  getMessage() {
    if (this.message) {
      if (this.encrypt) {
        return {
          encryptedMessage: this.message
        }; 
      } else {
        return {
          message: this.message,
          type: 'message',
          messageIsText: true
        };
      }
    }
    return null;
  }

}
