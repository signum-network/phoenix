import {Component, OnInit} from '@angular/core';
import {Account, SuggestedFees} from '@signumjs/core';
import {ActivatedRoute} from '@angular/router';
import {TokenData} from '../token.service';
import {StoreService} from '../../../store/store.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {getBalancesFromAccount} from '../../../util/balance';

@Component({
  selector: 'app-token-transfer',
  templateUrl: './token-transfer.component.html',
  styleUrls: ['./token-transfer.component.scss']
})
export class TokenTransferComponent extends UnsubscribeOnDestroy implements OnInit {

  account: Account;
  fees: SuggestedFees;
  token: TokenData;
  locale: string;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
    this.token = this.route.snapshot.data.token as TokenData;

    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({language}) => {
        this.locale = language;
      });
  }

  getBalance(): string {
    return getBalancesFromAccount(this.account).availableBalance.getSigna();
  }
}
