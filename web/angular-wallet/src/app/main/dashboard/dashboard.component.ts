import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {DashboardService} from './dashboard.service';
import {Subscription} from 'rxjs';
import {Router, NavigationEnd} from '@angular/router';
import {StoreService} from 'app/store/store.service';
import {Account, Transaction} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import {AccountService} from 'app/setup/account/account.service';
import {MatTableDataSource} from '@angular/material';
import {MarketService} from "./market/market.service";


@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DashboardComponent implements OnInit {

  widgets: any;
  navigationSubscription: Subscription;
  account: Account;
  priceBtc: number;
  priceUsd: number;

  public dataSource: MatTableDataSource<Transaction>;
  public convertNQTStringToNumber = convertNQTStringToNumber;

  constructor(private _dashboardService: DashboardService,
              private router: Router,
              private storeService: StoreService,
              private accountService: AccountService,
              private dashboardService: DashboardService,
              private marketService: MarketService) {

    // handle route reloads (i.e. if user changes accounts)
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.fetchTransactions();
      }
    });
  }

  fetchTransactions = async () => {
    try {
      this.account = await this.storeService.getSelectedAccount();
      const accountTransactions = await this.accountService.getAccountTransactions(this.account.account);
      this.dataSource = new MatTableDataSource<Transaction>();
      this.dataSource.data = accountTransactions.transactions;
    } catch (e) {
      console.log(e);
    }
  };

  async ngOnInit() {
    this.fetchTransactions();

    this.marketService.getBurstTicker().subscribe( ({price_btc, price_usd}) => {
      this.priceBtc = parseFloat(price_btc);
      this.priceUsd = parseFloat(price_usd);
    });

  }

  convertBalanceInBtc = (balanceNQT: string) => this.convertNQTStringToNumber(balanceNQT) * this.priceBtc;
  convertBalanceInUsDollar = (balanceNQT: string) => this.convertNQTStringToNumber(balanceNQT) * this.priceUsd;
}

