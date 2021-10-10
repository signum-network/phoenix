import { Component, OnInit } from '@angular/core';
import { DashboardLayoutService } from '../dashboard.layout.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { PowerDashboardLayoutParameters, PowerDashboardLayoutConfiguration } from './PowerDashboardLayoutConfiguration';
import { Account } from '@signumjs/core';
import { StoreService } from '../../../store/store.service';
import { AccountService } from '../../../setup/account/account.service';
import { NotifierService } from 'angular-notifier';
import { MarketServiceCoinGecko } from '../widgets/market/services/coingecko/coingecko.market.service';
import { MarketInfoCoingecko } from '../widgets/market/services/coingecko/types';

const LayoutConfiguration = new PowerDashboardLayoutConfiguration();

@Component({
  selector: 'app-power-dashboard',
  templateUrl: './power-dashboard.component.html',
  styleUrls: ['./power-dashboard.component.scss']
})
export class PowerDashboardComponent extends UnsubscribeOnDestroy implements OnInit {

  account: Account;
  priceBtc: number;
  priceUsd: number;
  priceEur: number;
  priceRub: number;
  layoutParameters: PowerDashboardLayoutParameters = LayoutConfiguration.xl;

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
      .subscribe((account: Account) => {
          this.account = account;
        }
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
      .subscribe((layoutParams: PowerDashboardLayoutParameters) => {
        setTimeout(() => {
          this.layoutParameters = layoutParams;
        }, 500);
      });
  }

}
