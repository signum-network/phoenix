import { Component, OnInit } from '@angular/core';
import { TransactionType, TransactionArbitrarySubtype } from '@signumjs/core';
import { Amount } from '@signumjs/util';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { AddressPattern } from 'app/util/addressPattern';
import { isKeyDecryptionError } from '../../util/exceptions/isKeyDecryptionError';
import { WalletAccount } from 'app/util/WalletAccount';
import { isTextIsJson } from 'app/util/isTextIsJson';
import { isTextIsSrc44 } from 'app/util/isTextIsSrc44';


@Component({
  selector: 'app-set-account-info',
  templateUrl: './set-account-info.component.html',
  styleUrls: ['./set-account-info.component.scss']
})
export class SetAccountInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private storeService: StoreService,
              private notifierService: NotifierService,
              private i18nService: I18nService) {
  }

  name: string;
  description = {
    src44: '',
    json: '',
    custom: ''
  };

  showMessage = false;
  isSending = false;
  immutable = false;
  deadline = '24';
  pin = '';
  fee: string;

  account: WalletAccount;
  txType = TransactionType.Arbitrary;
  txSubtype = TransactionArbitrarySubtype.AccountInfo;
  formatTypeOptions: string[] = ['src44', 'json', 'custom'];
  formatType: FormControl = new FormControl('src44');


  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as WalletAccount;
    this.immutable = this.account.type === 'offline';
    setTimeout(() => {
      this.name = this.account.name || '';
      this.detectFormat();
    }, 0);
  }

  getDescription(): string {
    // @ts-ignore
    return this.description[this.formatType.value] || '';
  }

  async onSubmit(event): Promise<void> {
    event.stopImmediatePropagation();
    this.isSending = true;
    try {
      await this.accountService.setAccountInfo({
        name: this.name,
        description: this.getDescription(),
        feePlanck: Amount.fromSigna(this.fee).getPlanck(),
        deadline: parseFloat(this.deadline) * 60,
        pin: this.pin,
        keys: this.account.keys
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_set_account_info'));
      this.setPin('');
      await this.router.navigate(['/']);
    } catch (e) {
      if (isKeyDecryptionError(e)) {
        this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
      } else {
        this.notifierService.notify('error', this.i18nService.getTranslation('error_unknown'));
      }
    } finally {
      this.isSending = false;
    }
  }

  isTooLong(): boolean {
    return this.getDescription().length >= 1000;
  }

  canSubmit(): boolean {
    return this.pin.length > 0 && !this.isTooLong();
  }

  setPin(pin: string): void {
    this.pin = pin;
  }


  getPayloadLength(): number {
    const description = this.getDescription();
    return (this.name ? this.name.length : 0) +
      (description ? description.length : 0) + 32;
  }

  private detectFormat(): void {
    let format = 'custom';
    this.description.custom = this.account.description;

    if (isTextIsJson(this.account.description)) {
      format = 'json';
      this.description.json = this.account.description;
    }

    // most relevant.... so it comes last
    if (isTextIsSrc44(this.account.description)) {
      format = 'src44';
      this.description.src44 = this.account.description;
    }

    this.formatType.setValue(this.account.description ? format : 'src44');
  }
}
