import { Component, OnInit } from '@angular/core';
import { DashboardLayoutService } from '../dashboard.layout.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { PowerDashboardLayoutParameters, PowerDashboardLayoutConfiguration } from './PowerDashboardLayoutConfiguration';
import { StoreService } from 'app/store/store.service';
import { MarketServiceCoinGecko } from '../widgets/market/services/coingecko/coingecko.market.service';
import { MarketInfoCoingecko } from '../widgets/market/services/coingecko/types';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from 'app/shared/services/account-management.service';

const LayoutConfiguration = new PowerDashboardLayoutConfiguration();

@Component({
  selector: 'app-power-dashboard',
  templateUrl: './power-dashboard.component.html',
  styleUrls: ['./power-dashboard.component.scss']
})
export class PowerDashboardComponent extends UnsubscribeOnDestroy implements OnInit {

  account: WalletAccount;
  priceBtc: number;
  priceUsd: number;
  priceEur: number;
  priceRub: number;
  layoutParameters: PowerDashboardLayoutParameters = LayoutConfiguration.xl;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private storeService: StoreService,
    private accountManagementService: AccountManagementService,
    private marketService: MarketServiceCoinGecko,
    private layoutService: DashboardLayoutService
  ) {
    super();
    this.layoutService.setLayoutConfiguration(LayoutConfiguration);
  }

  ngOnInit(): void {

    this.account = this.accountManagementService.getSelectedAccount();

    this.storeService.accountUpdated$
      .pipe(this.unsubscribe)
      .subscribe((account: WalletAccount) => {
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
          this.layoutParameters = layoutParams;
        });
  }

}
