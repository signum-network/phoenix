import {Component, OnInit} from '@angular/core';
import {DashboardLayoutService} from '../dashboard.layout.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from 'app/util/UnsubscribeOnDestroy';
import {PowerDashboardLayoutParameters, PowerDashboardLayoutConfiguration} from './PowerDashboardLayoutConfiguration';
import {Account} from '@signumjs/core';
import {MarketInfoCryptoCompare} from '../widgets/market/types';
import {StoreService} from '../../../store/store.service';
import {AccountService} from '../../../setup/account/account.service';
import {NotifierService} from 'angular-notifier';
import {MarketService} from '../widgets/market/market.service';

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
  layoutParameters: PowerDashboardLayoutParameters = LayoutConfiguration.xl;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    private notificationService: NotifierService,
    private marketService: MarketService,
    private layoutService: DashboardLayoutService,
  ) {
    super();
    this.layoutService.setLayoutConfiguration(LayoutConfiguration);
  }

  ngOnInit(): void {

    this.accountService.currentAccount$
      .pipe(this.unsubscribe)
      .subscribe((account: Account) => {
        this.account = account;
      });

    this.marketService.ticker$
      .pipe(this.unsubscribe)
      .subscribe((data: MarketInfoCryptoCompare) => {
        this.priceBtc = data.BTC.PRICE;
        this.priceUsd = data.USD.PRICE;
        this.priceEur = data.EUR.PRICE;
      });

    this.layoutService.layout$
      .pipe(this.unsubscribe)
      .subscribe((layoutParams: PowerDashboardLayoutParameters) => {
        this.layoutParameters = layoutParams;
      });
  }

}
