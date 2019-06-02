import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { NgForm } from '@angular/forms';
import { burstAddressPattern } from '@burstjs/util';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { TransactionService } from '../transactions/transaction.service';

@Component({
  selector: 'app-set-account-info',
  templateUrl: './set-account-info.component.html',
  styleUrls: ['./set-account-info.component.scss']
})
export class SetAccountInfoComponent implements OnInit {
  @ViewChild('setAccountInfoForm', { static: false }) public setAccountInfoForm: NgForm;
  public feeNQT: string;
  @ViewChild('name', { static: false }) public name: string;
  @ViewChild('description', { static: false }) public description: string;
  @ViewChild('fullHash', { static: false }) public fullHash: string;
  @ViewChild('pin', { static: false }) public pin: string;

  @Output() submit = new EventEmitter<any>();
  advanced: boolean = false;
  showMessage: boolean = false;
  burstAddressPatternRef = burstAddressPattern;
  deadline = '24';

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

  async onSubmit(event) {
    event.stopImmediatePropagation();
    try {
      await this.accountService.setAccountInfo({
        name: this.name,
        description: this.description,
        feeNQT: this.feeNQT,
        deadline: parseFloat(this.deadline) * 60,
        pin: this.pin,
        keys: this.account.keys,
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_set_account_info'));
      this.setAccountInfoForm.resetForm();
    } catch (e) { 
      this.notifierService.notify('error', this.i18nService.getTranslation('error_unknown'));
    }
  }
}
 