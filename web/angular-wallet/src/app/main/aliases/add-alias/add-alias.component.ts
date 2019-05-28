import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { NgForm } from '@angular/forms';
import { burstAddressPattern } from '@burstjs/util';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';

@Component({
  selector: 'app-add-alias',
  templateUrl: './add-alias.component.html',
  styleUrls: ['./add-alias.component.scss']
})
export class AddAliasComponent implements OnInit {
  @ViewChild('setAliasForm') public setAliasForm: NgForm;
  @ViewChild('alias') public alias: string;
  @ViewChild('description') public description: string;
  @ViewChild('fullHash') public fullHash: string;
  @ViewChild('pin') public pin: string;
  @ViewChild('uri') public uri: string;
  @ViewChild('accountAliasURI') public accountAliasURI: string;
  @Output() submit = new EventEmitter<any>();

  public feeNQT: string;
  advanced = false;
  showMessage = false;
  burstAddressPatternRef = burstAddressPattern;
  type = 'uri';
  account: Account;
  deadline = '24';
  fees: SuggestedFees;

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private notifierService: NotifierService,
    private i18nService: I18nService) {
  }

  ngOnInit() {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;

    this.accountAliasURI = this.account.accountRS;
  }

  async onSubmit(event) {
    event.stopImmediatePropagation();
    try {
      await this.accountService.setAlias({
        aliasName: this.alias,
        aliasURI: this.getAliasURI(),
        feeNQT: this.feeNQT,
        deadline: parseFloat(this.deadline) * 60,
        pin: this.pin,
        keys: this.account.keys,
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_alias_register'));
      this.setAliasForm.resetForm();
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_unknown'));
    }
  }

  private getAliasURI(): string {
    switch (this.type) {
      case 'acct':
        return `${this.type}:${this.accountAliasURI.toLowerCase()}@burst`;
      default:
        return this.uri;
    }
  }
}
