import {Component, OnInit} from '@angular/core';
import {SuggestedFees} from '@signumjs/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {getBalancesFromAccount} from '../../util/balance';
import { WalletAccount } from "app/util/WalletAccount";

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent extends UnsubscribeOnDestroy implements OnInit {
  account: WalletAccount;
  fees: SuggestedFees;
  language: string;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private storeService: StoreService) {
    super();
  }


  ngOnInit(): void {
    this.account = this.route.snapshot.data.account;
    this.fees = this.route.snapshot.data.suggestedFees;

    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({language}) => {
          this.language = language;
        }
      );

    this.storeService.ready
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((ready) => {
        if (!ready) {
          return;
        }
        this.accountService.currentAccount$
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe((account) => {
            this.account = account;
          });
      });
  }

  getBalance(): string {
      return getBalancesFromAccount(this.account).availableBalance.getSigna();
  }
}
