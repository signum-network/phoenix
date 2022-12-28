import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { SuggestedFees, AddressPrefix, TransactionType, TransactionArbitrarySubtype } from '@signumjs/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'app/setup/account/account.service';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {AddressPattern} from 'app/util/addressPattern';
import {NetworkService} from '../../../network/network.service';
import {CurrencySymbol} from '@signumjs/util';
import {handleException} from '../../../util/exceptions/handleException';
import { WalletAccount } from '../../../util/WalletAccount';

const isNotEmpty = (value: string) => value && value.length > 0;

@Component({
  selector: 'app-add-alias',
  templateUrl: './add-alias.component.html',
  styleUrls: ['./add-alias.component.scss']
})
export class AddAliasComponent implements OnInit {
  @ViewChild('setAliasForm', {static: false}) public setAliasForm: NgForm;
  @ViewChild('alias', {static: false}) public alias: string;
  @ViewChild('description', {static: false}) public description: string;
  @ViewChild('fullHash', {static: false}) public fullHash: string;
  @ViewChild('pin', {static: false}) public pin: string;
  @ViewChild('uri', {static: false}) public uri: string;
  @ViewChild('accountAliasURI', {static: true}) public accountAliasURI: string;
  @Output() submit = new EventEmitter<any>();

  fee = '';
  txType = TransactionType.Arbitrary;
  txSubtype = TransactionArbitrarySubtype.AliasAssignment;
  advanced = false;
  showMessage = false;
  addressPatternRef = AddressPattern;
  type = 'acct';
  account: WalletAccount;
  fees: SuggestedFees;
  addressPrefix: AddressPrefix.MainNet | AddressPrefix.TestNet;
  symbol = CurrencySymbol;
  isSending = false;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private notifierService: NotifierService,
              private networkService: NetworkService,
              private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as WalletAccount;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
    this.addressPrefix = this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet;
    this.accountAliasURI = this.account.accountRS;
  }

  async onSubmit(event): Promise<void> {
    this.isSending = true;
    event.stopImmediatePropagation();
    try {
      await this.accountService.setAlias({
        aliasName: this.alias,
        aliasURI: this.getAliasURI(),
        feeNQT: this.fee,
        pin: this.pin,
        keys: this.account.keys,
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_alias_register'));
      this.setAliasForm.resetForm();
      this.accountAliasURI = this.account.accountRS;
      this.type = 'acct';

    } catch (e) {
      handleException({
        e,
        i18nService: this.i18nService,
        notifierService: this.notifierService
      });
    } finally {
      this.isSending = false;
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

  canSubmit(): boolean {
    let value = '';
    switch (this.type) {
      case 'acct':
        value = this.accountAliasURI;
        break;
      case 'uri':
        value = this.uri;
        break;
      case 'other':
      default:
        value = this.alias;
    }
    return isNotEmpty(this.pin) && isNotEmpty(this.alias) && isNotEmpty(value);
  }

  getPayloadLength(): number {
    let attachment = '"version.AliasAssignment":1,';
    switch (this.type) {
      case 'acct':
        attachment += `acct: "${this.accountAliasURI}"`;
        break;
      case 'uri':
        attachment += `uri: "${this.uri}"`;
        break;
      case 'other':
      default:
        attachment += `alias: "${this.alias}"`;
    }
    return attachment.length;
  }
}
