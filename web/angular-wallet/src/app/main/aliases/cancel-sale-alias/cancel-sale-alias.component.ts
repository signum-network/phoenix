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
import { NotifierService } from 'angular-notifier';
import { I18nService } from '../../../shared/services/i18n.service';
import { StoreService } from '../../../store/store.service';
import { takeUntil } from 'rxjs/operators';
import { isNotEmpty } from 'app/util/forms';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { AliasService } from '../alias.service';
import { ExceptionHandlerService } from 'app/shared/services/exceptionhandler.service';

@Component({
  selector: 'app-cancel-sale-alias',
  templateUrl: './cancel-sale-alias.component.html',
  styleUrls: ['./cancel-sale-alias.component.scss']
})
export class CancelSaleAliasComponent extends UnsubscribeOnDestroy implements OnInit {
  alias: Alias;
  account: WalletAccount;
  fees: SuggestedFees;
  immutable: boolean;
  fee: string;
  type = TransactionType.Arbitrary;
  subtype = TransactionArbitrarySubtype.AliasSale;

  pin: string;
  isSending: boolean;


  constructor(
    private aliasService: AliasService,
    private notifierService: NotifierService,
    private errorService: ExceptionHandlerService,
    private i18nService: I18nService,
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
  }

  async onSubmit(event): Promise<void> {
    event.stopImmediatePropagation();
    try {
      this.isSending = true;
      await this.aliasService.cancelAliasSale({
        aliasName: this.alias.aliasName,
        feePlanck: Amount.fromSigna(this.fee).getPlanck(),
        recipientId: this.account.account,
        keys: this.account.keys,
        pin: this.pin,
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_alias_cancel_sale'));
      await this.router.navigate(['/']);
    } catch (e) {
      this.errorService.handle(e);
    } finally {
      this.isSending = false;
    }
  }

  canSubmit(): boolean {
    return isNotEmpty(this.pin);
  }
}
