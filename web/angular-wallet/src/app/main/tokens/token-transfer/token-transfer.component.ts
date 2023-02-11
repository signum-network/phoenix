import { Component, OnInit } from '@angular/core';
import { SuggestedFees } from '@signumjs/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../store/store.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../../util/UnsubscribeOnDestroy';
import { getBalancesFromAccount } from '../../../util/balance';
import { TokenData } from '../../../shared/services/token.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from "../../../shared/services/account-management.service";

@Component({
  selector: 'app-token-transfer',
  templateUrl: './token-transfer.component.html',
  styleUrls: ['./token-transfer.component.scss']
})
export class TokenTransferComponent extends UnsubscribeOnDestroy implements OnInit {

  account: WalletAccount;
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
    this.account = this.route.snapshot.data.account;
    this.fees = this.route.snapshot.data.suggestedFees;
    this.token = this.route.snapshot.data.token;

    this.storeService.settingsUpdated$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ language }) => {
        this.locale = language;
      });
  }

  getBalance(): string {
    return getBalancesFromAccount(this.account).availableBalance.getSigna();
  }
}
