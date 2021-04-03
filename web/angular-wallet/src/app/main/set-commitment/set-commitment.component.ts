import {Component, OnInit} from '@angular/core';
import {SuggestedFees, Account} from '@burstjs/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from '../../store/store.service';
import {takeUntil} from 'rxjs/operators';
import {getBalancesFromAccount} from '../../util/balance';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-set-commitment',
  templateUrl: './set-commitment.component.html',
  styleUrls: ['./set-commitment.component.scss']
})
export class SetCommitmentComponent extends UnsubscribeOnDestroy implements OnInit {
  account: Account;
  fees: SuggestedFees;
  language: string;
  isSupported = false;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private accountService: AccountService,
              private storeService: StoreService) {
    super();
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;

    this.apiService.supportsPocPlus().then(supportsPocPlus =>
      this.isSupported = supportsPocPlus
    );

    const unsubscribeAll = takeUntil(this.unsubscribeAll);
    this.storeService.settings
      .pipe(unsubscribeAll)
      .subscribe(({language}) => {
          this.language = language;
        }
      );

    this.storeService.ready
      .pipe(unsubscribeAll)
      .subscribe((ready) => {
        if (!ready) {
          return;
        }
        this.accountService.currentAccount
          .pipe(unsubscribeAll)
          .subscribe((account: Account) => {
            this.account = account;
          });
      });
  }

  getBalance(): string {
    return getBalancesFromAccount(this.account).availableBalance.getBurst();
  }
}
