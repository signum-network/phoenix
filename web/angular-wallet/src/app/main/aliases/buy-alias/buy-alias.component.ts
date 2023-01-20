import { Component, OnInit } from '@angular/core';
import {
  SuggestedFees,
  Alias,
  TransactionType,
  TransactionArbitrarySubtype
} from '@signumjs/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletAccount } from 'app/util/WalletAccount';
import { Amount } from '@signumjs/util';
import { constants } from '../../../constants';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { I18nService } from '../../../layout/components/i18n/i18n.service';
import { StoreService } from '../../../store/store.service';
import { takeUntil } from 'rxjs/operators';
import { AccountBalances, getBalancesFromAccount } from "app/util/balance";
import { isNotEmpty } from 'app/util/forms';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { AliasService } from '../alias.service';
import { ExceptionHandlerService } from '../../../shared/services/exceptionhandler.service';
import { AccountService } from 'app/setup/account/account.service';

@Component({
  selector: 'app-buy-alias',
  templateUrl: './buy-alias.component.html',
  styleUrls: ['./buy-alias.component.scss']
})
export class BuyAliasComponent extends UnsubscribeOnDestroy implements OnInit {
  alias: Alias;
  account: WalletAccount;
  fees: SuggestedFees;
  language: string;
  immutable: boolean;
  messageIsText: boolean;
  encrypt: boolean;
  amount: Amount;
  fee: string;
  message: string;
  type = TransactionType.Arbitrary;
  subtype = TransactionArbitrarySubtype.AliasBuy;

  pin: string;

  private balances: AccountBalances;
  attachMessage: boolean;
  isSending: boolean;
  private recipientPublicKey = '';


  constructor(
    private warnDialog: MatDialog,
    private aliasService: AliasService,
    private accountService: AccountService,
    private notifierService: NotifierService,
    private errorService: ExceptionHandlerService,
    private i18nService: I18nService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as WalletAccount;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
    this.alias = this.route.snapshot.data.alias as Alias;
    this.immutable = false;
    this.messageIsText = true;
    this.encrypt = false;
    this.balances = getBalancesFromAccount(this.account);
    this.amount = this.alias ? Amount.fromPlanck(this.alias.priceNQT || '0') : Amount.Zero();


    this.fetchRecipientPublicKey(this.alias.account);

    this.storeService.settingsUpdated$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({ language }) => {
          this.language = language;
        }
      );
  }

  private async fetchRecipientPublicKey(accountId: string): Promise<void> {
    try {
      const account = await this.accountService.getAccount(accountId);
      this.recipientPublicKey = account.keys.publicKey;
    } catch (e) {
      // ignore
    }
  }

  async onSubmit(event): Promise<void> {
    event.stopImmediatePropagation();
    try {
      this.isSending = true;
      await this.aliasService.buyAlias({
        aliasName: this.alias.aliasName,
        amountPlanck: this.amount.getPlanck(),
        feePlanck: Amount.fromSigna(this.fee).getPlanck(),
        recipientPublicKey: this.recipientPublicKey,
        keys: this.account.keys,
        pin: this.pin,
        message: this.message,
        shouldEncryptMessage: this.encrypt,
        messageIsText: this.messageIsText
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_alias_buy'));
      await this.router.navigate(['/']);
    } catch (e) {
      this.errorService.handle(e);
    } finally {
      this.isSending = false;
    }
  }

  getTotal(): Amount {
    return this.amount !== undefined && this.fee !== undefined
      ? this.amount.clone().add(Amount.fromSigna(this.fee))
      : Amount.Zero();
  }


  hasSufficientBalance(): boolean {
    if (!this.balances) {
      return false;
    }
    const available = this.balances.availableBalance.clone();
    return available.greaterOrEqual(this.getTotal());
  }

  isMessageTooLong(): boolean {
    return this.message && this.message.length > 1000;
  }

  canSubmit(): boolean {
    return isNotEmpty(this.pin)
      && !this.isMessageTooLong()
      && this.hasSufficientBalance();
  }

  canEncrypt(): boolean {
    return this.recipientPublicKey && this.recipientPublicKey !== constants.smartContractPublicKey;
  }
}
