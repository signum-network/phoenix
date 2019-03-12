import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { StoreService } from 'app/store/store.service';
import { Account, Transaction} from '@burstjs/core';
import { convertNQTStringToNumber } from '@burstjs/util';
import { AccountService } from 'app/setup/account/account.service';
import { MatTableDataSource } from '@angular/material';

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

  public dataSource: MatTableDataSource<Transaction>;
  private btc_burst: number;
  private usdc_btc: number;

  constructor(private _dashboardService: DashboardService,
    private router: Router,
    private storeService: StoreService,
    private accountService: AccountService,
    private dashboardService: DashboardService) {

    // handle route reloads (i.e. if user changes accounts)
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.fetchTransactions();
      }
    });
  }

  async fetchTransactions() {
    try {
      this.account = await this.storeService.getSelectedAccount();
      const accountTransactions = await this.accountService.getAccountTransactions(this.account.account);
      this.dataSource = new MatTableDataSource<Transaction>();
      this.dataSource.data = accountTransactions.transactions;
    } catch (e) {
      console.log(e);
    }
  }

  async ngOnInit() {
    this.fetchTransactions();
    this.fetchBalanceInfos();
  }

  public convertNQTStringToNumber(balanceNQT) {
    return convertNQTStringToNumber(balanceNQT);
  }

  private fetchBalanceInfos() {
    this.dashboardService.getBalanceInfo().subscribe((info: any) => {
      this.btc_burst = parseFloat(info.BTC_BURST.last);
      this.usdc_btc = parseFloat(info.USDC_BTC.last);
    });
  }

  convertBalanceInSatoshi(balanceNQT: string) {
    return this.convertNQTStringToNumber(balanceNQT) * this.btc_burst * 1E6;
  }

  convertBalanceInUsCent(balanceNQT: string) {
    return this.convertNQTStringToNumber(balanceNQT) * this.btc_burst * this.usdc_btc;
  }
}

