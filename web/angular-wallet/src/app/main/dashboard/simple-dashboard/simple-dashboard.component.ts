import {Component, OnInit, ViewChild} from '@angular/core';
import {MatGridList} from '@angular/material/grid-list';
import {Transaction} from '@signumjs/core';
import {Settings} from '../../../store/settings';
import {MatTableDataSource} from '@angular/material/table';
import {takeUntil} from 'rxjs/operators';
import {StoreService} from '../../../store/store.service';
import {AccountService} from '../../../setup/account/account.service';
import {NotifierService} from 'angular-notifier';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {DashboardLayoutService} from '../dashboard.layout.service';
import {
  SimpleDashboardLayoutParameters,
  SimpleDashboardLayoutConfiguration
} from './SimpleDashboardLayoutConfiguration';
import { MarketInfoCoingecko } from '../widgets/market/services/coingecko/types';
import { MarketServiceCoinGecko } from '../widgets/market/services/coingecko/coingecko.market.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from "../../../shared/services/account-management.service";

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
              private notificationService: NotifierService,
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
