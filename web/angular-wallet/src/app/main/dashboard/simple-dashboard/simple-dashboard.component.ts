import {Component, OnInit, ViewChild} from '@angular/core';
import {MatGridList} from '@angular/material/grid-list';
import {Account, Transaction} from '@signumjs/core';
import {Settings} from '../../../settings';
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
import { MarketInfoCoingecko } from "../widgets/market/services/coingecko/types";
import { PowerDashboardLayoutParameters } from "../power-dashboard/PowerDashboardLayoutConfiguration";
import { MarketServiceCoinGecko } from "../widgets/market/services/coingecko/coingecko.market.service";
import { LayoutParameters } from "../LayoutConfiguration";
// import {MarketService} from '../widgets/market/market.service';
// import {MarketInfoCryptoCompare} from '../widgets/market/types';

const LayoutConfiguration = new SimpleDashboardLayoutConfiguration();

@Component({
  selector: 'app-simple-dashboard',
  templateUrl: './simple-dashboard.component.html',
  styleUrls: ['./simple-dashboard.component.scss']
})
export class SimpleDashboardComponent extends UnsubscribeOnDestroy implements OnInit {

  @ViewChild('gridList', {static: true}) gridList: MatGridList;
  widgets: any;
  account: Account;
  priceBtc: number;
  priceUsd: number;
  priceEur: number;
  priceRub: number;
  settings: Settings;
  layoutParameters = LayoutConfiguration.xl;

  public dataSource: MatTableDataSource<Transaction>;
  public isActivating = false;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
              private storeService: StoreService,
              private accountService: AccountService,
              private notificationService: NotifierService,
              private marketService: MarketServiceCoinGecko,
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

    this.storeService.settings
      .pipe(this.unsubscribe)
      .subscribe((settings: Settings) => {
        this.settings = settings;
      });

  }

  setTransactions = account => {
    this.account = account;
    this.dataSource = new MatTableDataSource<Transaction>();
    this.dataSource.data = account.transactions.concat().splice(0, 10);
  }

  closeWelcomeNotification = () => {
    this.settings.welcomeMessageHiddenFrom.push(this.account.account);
    this.storeService.saveSettings(this.settings);
  }

  async activateAccount(): Promise<void> {
    try {
      this.isActivating = true;
      await this.accountService.activateAccount(this.account);
      this.notificationService.notify('success', 'Successfully requested activation. Your account will be activated in a few moments.');
    } catch (e) {
      this.notificationService.notify('error', `Activation failed: ${e.message}`);
    } finally {
      this.isActivating = false;
    }
  }

  marketServiceName(): string {
    return 'foo' ;//this.marketService.serviceName;
  }
}
