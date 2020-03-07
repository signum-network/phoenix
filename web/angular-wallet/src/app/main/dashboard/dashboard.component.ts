import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {StoreService} from 'app/store/store.service';
import {Account, Transaction} from '@burstjs/core';
import {AccountService} from 'app/setup/account/account.service';
import {MatTableDataSource} from '@angular/material/table';
import {MarketService} from './market/market.service';
import {Settings} from 'app/settings';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DashboardComponent extends UnsubscribeOnDestroy implements OnInit {

  widgets: any;
  account: Account;
  priceBtc: number;
  priceUsd: number;
  settings: Settings;

  public dataSource: MatTableDataSource<Transaction>;
  public isActivating = false;

  constructor(private router: Router,
              private storeService: StoreService,
              private accountService: AccountService,
              private notificationService: NotifierService,
              private marketService: MarketService) {

    super();
    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((settings) => {
        this.settings = settings;
      });
  }

  ngOnInit(): void {

    this.accountService.currentAccount
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(this.setTransactions);

    this.marketService.ticker$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((data) => {
        this.priceBtc = data.BTC.PRICE;
        this.priceUsd = data.USD.PRICE;
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
}


