import {Component, OnInit} from '@angular/core';
import {SuggestedFees, Account} from '@burstjs/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {getBalancesFromAccount} from '../../util/balance';

@Component({
  selector: 'app-send-burst',
  templateUrl: './send-burst.component.html',
  styleUrls: ['./send-burst.component.scss']
})
export class SendBurstComponent extends UnsubscribeOnDestroy implements OnInit {
  account: Account;
  fees: SuggestedFees;
  language: string;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private storeService: StoreService) {
    super();
  }


  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;

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
        this.accountService.currentAccount
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
