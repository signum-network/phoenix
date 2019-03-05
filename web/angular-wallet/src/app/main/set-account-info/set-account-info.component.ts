import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { NgForm } from '@angular/forms';
import { burstAddressPattern } from '@burstjs/util';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../transactions/transaction.service';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';

@Component({
  selector: 'app-set-account-info',
  templateUrl: './set-account-info.component.html',
  styleUrls: ['./set-account-info.component.scss']
})
export class SetAccountInfoComponent implements OnInit {
  @ViewChild('setAccountInfoForm') public setAccountInfoForm: NgForm;
  public feeNQT: string;
  @ViewChild('name') public name: string;
  @ViewChild('description') public description: string;
  @ViewChild('fullHash') public fullHash: string;
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
  }

  onSubmit(event) {
    this.accountService.setAccountInfo({
      name: this.name,
      description: this.description,
      feeNQT: this.feeNQT,
      deadline: parseFloat(this.deadline),
      pin: this.pin,
      keys: this.account.keys,
    }).then(() => {
      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
    }).catch(() => {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
    });
    event.stopImmediatePropagation();
  }

}
