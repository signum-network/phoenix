import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {Subscription} from 'rxjs';
import {filter, takeUntil, takeWhile} from 'rxjs/operators';
import {Router, NavigationEnd} from '@angular/router';
import {StoreService} from 'app/store/store.service';
import {Account, Transaction, TransactionList, UnconfirmedTransactionList} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import {AccountService} from 'app/setup/account/account.service';
import {MatTableDataSource} from '@angular/material/table';
import {MarketService} from './market/market.service';
import {Settings} from 'app/settings';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';


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

  constructor(private router: Router,
              private storeService: StoreService,
              private accountService: AccountService,
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

  ngOnInit(): void{

    this.accountService.currentAccount
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(this.setTransactions);

    this.marketService.ticker$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(({price_btc, price_usd}) => {
        this.priceBtc = parseFloat(price_btc);
        this.priceUsd = parseFloat(price_usd);
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

}

