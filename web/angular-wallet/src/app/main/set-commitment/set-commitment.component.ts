import {Component, OnInit} from '@angular/core';
import {SuggestedFees} from '@signumjs/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from '../../store/store.service';
import {takeUntil} from 'rxjs/operators';
import {getBalancesFromAccount} from '../../util/balance';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {ApiService} from '../../api.service';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-set-commitment',
  templateUrl: './set-commitment.component.html',
  styleUrls: ['./set-commitment.component.scss']
})
export class SetCommitmentComponent extends UnsubscribeOnDestroy implements OnInit {
  account: WalletAccount;
  fees: SuggestedFees;
  language: string;
  isSupported = true;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private accountService: AccountService,
              private storeService: StoreService) {
    super();
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account;
    this.fees = this.route.snapshot.data.suggestedFees;

    const unsubscribeAll = takeUntil(this.unsubscribeAll);
    this.storeService.languageSelected$
      .pipe(unsubscribeAll)
      .subscribe((language: string) => {
          this.language = language;
        }
      );
  }

  getBalance(): string {
    return getBalancesFromAccount(this.account).availableBalance.getSigna();
  }
}
