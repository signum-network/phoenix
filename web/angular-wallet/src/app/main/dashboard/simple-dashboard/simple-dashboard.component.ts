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
  settings: Settings;

  public dataSource: MatTableDataSource<Transaction>;
  public isActivating = false;

  columnCount: number;
  layoutParameters = LayoutConfiguration.xl;
  unsubscriber = takeUntil(this.unsubscribeAll);

  constructor(
              private storeService: StoreService,
              private accountService: AccountService,
              private notificationService: NotifierService,
              // private marketService: MarketService,
              private layoutService: DashboardLayoutService,
  ) {
    super();
    this.layoutService.setLayoutConfiguration(LayoutConfiguration);
  }

  ngOnInit(): void {

    this.storeService.settings
      .pipe(this.unsubscriber)
      .subscribe((settings: Settings) => {
        this.settings = settings;
      });

    this.accountService.currentAccount$
      .pipe(this.unsubscriber)
      .subscribe(this.setTransactions);

    // this.marketService.ticker$
    //   .pipe(this.unsubscriber)
    //   .subscribe((data: MarketInfoCryptoCompare) => {
    //     this.priceBtc = data.BTC.PRICE;
    //     this.priceUsd = data.USD.PRICE;
    //     this.priceEur = data.EUR.PRICE;
    //   });

    this.layoutService.layout$
      .pipe(this.unsubscriber)
      .subscribe( (layoutAttributes: SimpleDashboardLayoutParameters) => {
        this.layoutParameters = layoutAttributes;
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
