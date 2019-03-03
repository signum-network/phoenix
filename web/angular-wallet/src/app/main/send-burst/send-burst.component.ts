import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { NgForm } from '@angular/forms';
import { burstAddressPattern, convertNQTStringToNumber } from '@burstjs/util';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../transactions/transaction.service';
import { decryptAES } from '@burstjs/crypto';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';

@Component({
  selector: 'app-send-burst',
  templateUrl: './send-burst.component.html',
  styleUrls: ['./send-burst.component.scss']
})
export class SendBurstComponent implements OnInit {
  @ViewChild('sendBurstForm') public sendBurstForm: NgForm;
  public feeNQT: string;
  @ViewChild('recipientAddress') public recipientAddress: string;
  @ViewChild('amountNQT') public amountNQT: string;
  @ViewChild('message') public message: string;
  @ViewChild('fullHash') public fullHash: string;
  @ViewChild('encrypt') public encrypt: string;
  @ViewChild('pin') public pin: string;
  @ViewChild('deadline') public deadline: string;

  @Output() submit = new EventEmitter<any>();
  advanced: boolean = false;
  showMessage: boolean = false;
  burstAddressPatternRef = burstAddressPattern;

  account: Account;
  fees: SuggestedFees;

  constructor(private route: ActivatedRoute,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private storeService: StoreService,
    private notifierService: NotifierService,
    private i18nService: I18nService) {
  }

  ngOnInit() {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;

    this.storeService.ready.subscribe((ready) => {
      if (ready) {
        this.accountService.currentAccount.subscribe((account) => {
          this.account = account;
        });
      }
    });

  }

  getTotal() {
    return parseFloat(this.amountNQT) + parseFloat(this.feeNQT) || 0;
  }

  onSubmit(event) {
    this.transactionService.sendMoney({
      transaction: {
        amountNQT: parseFloat(this.amountNQT),
        feeNQT: this.feeNQT,
        attachment: this.getMessage(),
        deadline: parseFloat(this.deadline),
        fullHash: this.fullHash,
        type: 1
      },
      pin: this.pin,
      keys: this.account.keys,
      recipientAddress: `BURST-${this.recipientAddress}`,
    }).then(() => {
      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
    }).catch(() => {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
    });
    event.stopImmediatePropagation();
  }

  getMessage() {
    if (this.message) {
      if (this.encrypt) {
        return {
          encryptedMessage: this.message
        }
      } else {
        return {
          message: this.message,
          type: 'message',
          messageIsText: true
        }
      }
    }
    return null;
  }
}
