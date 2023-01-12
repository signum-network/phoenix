import { Component, OnInit } from '@angular/core';
import { Account } from '@signumjs/core';
import { takeUntil } from 'rxjs/operators';
import { StoreService } from '../../../store/store.service';
import { AccountService } from '../../../setup/account/account.service';
import { NotifierService } from 'angular-notifier';
import { MarketServiceCoinGecko } from '../widgets/market/services/coingecko/coingecko.market.service';
import { DashboardLayoutService } from '../dashboard.layout.service';
import { MarketInfoCoingecko } from '../widgets/market/services/coingecko/types';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { MinerDashboardLayoutConfiguration, MinerDashboardLayoutParameters } from './MinerDashboardLayoutConfiguration';
import { WalletAccount } from "app/util/WalletAccount";

const LayoutConfiguration = new MinerDashboardLayoutConfiguration();

@Component({
  selector: 'app-miner-dashboard',
  templateUrl: './miner-dashboard.component.html',
  styleUrls: ['./miner-dashboard.component.scss']
})
export class MinerDashboardComponent extends UnsubscribeOnDestroy implements OnInit {

  account: WalletAccount;
  priceBtc: number;
  priceUsd: number;
  priceEur: number;
  priceRub: number;
  layoutParameters: MinerDashboardLayoutParameters = LayoutConfiguration.xl;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    private notificationService: NotifierService,
    private marketService: MarketServiceCoinGecko,
    private layoutService: DashboardLayoutService
  ) {
    super();
    this.layoutService.setLayoutConfiguration(LayoutConfiguration);
  }

  ngOnInit(): void {

    this.accountService.currentAccount$
      .pipe(this.unsubscribe)
      .subscribe((account: WalletAccount) => {
          this.account = account;       }
      );

    this.marketService.ticker$
      .pipe(this.unsubscribe)
      .subscribe((data: MarketInfoCoingecko) => {
        this.priceBtc = data.current_price.btc;
        this.priceUsd = data.current_price.usd;
        this.priceEur = data.current_price.eur;
        this.priceRub = data.current_price.rub;
      });

    this.layoutService.layout$
      .pipe(this.unsubscribe)
      .subscribe((layoutParams: MinerDashboardLayoutParameters) => {
        setTimeout(() => {
          this.layoutParameters = layoutParams;
        }, 500);
      });
  }

}
