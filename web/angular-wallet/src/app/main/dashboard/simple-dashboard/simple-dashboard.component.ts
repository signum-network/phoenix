import {Component, OnInit, ViewChild} from '@angular/core';
import {MatGridList} from '@angular/material/grid-list';
import {Settings} from 'app/store/settings';
import {takeUntil} from 'rxjs/operators';
import {StoreService} from 'app/store/store.service';
import {UnsubscribeOnDestroy} from 'app/util/UnsubscribeOnDestroy';
import {DashboardLayoutService} from '../dashboard.layout.service';
import {
  SimpleDashboardLayoutParameters,
  SimpleDashboardLayoutConfiguration
} from './SimpleDashboardLayoutConfiguration';
import { MarketInfoCoingecko } from '../widgets/market/services/coingecko/types';
import { MarketServiceCoinGecko } from '../widgets/market/services/coingecko/coingecko.market.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from 'app/shared/services/account-management.service';

const LayoutConfiguration = new SimpleDashboardLayoutConfiguration();

@Component({
  selector: 'app-simple-dashboard',
  templateUrl: './simple-dashboard.component.html',
  styleUrls: ['./simple-dashboard.component.scss']
})
export class SimpleDashboardComponent extends UnsubscribeOnDestroy implements OnInit {

  @ViewChild('gridList', {static: true}) gridList: MatGridList;
  account: WalletAccount;
  priceBtc: number;
  priceUsd: number;
  priceEur: number;
  priceRub: number;
  settings: Settings;
  layoutParameters = LayoutConfiguration.xl;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
              private storeService: StoreService,
              private accountManagementService: AccountManagementService,
              private marketService: MarketServiceCoinGecko,
              private layoutService: DashboardLayoutService,
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
      .subscribe((layoutParams: SimpleDashboardLayoutParameters) => {
        this.layoutParameters = layoutParams;
      });
  }
}
