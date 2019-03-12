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

  constructor(private _dashboardService: DashboardService,
    private router: Router,
    private storeService: StoreService,
    private accountService: AccountService) {

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
    // Get the widgets from the service
    this.widgets = this._dashboardService.widgets;
    this.fetchTransactions();
  }

  public convertNQTStringToNumber(balanceNQT) {
    return convertNQTStringToNumber(balanceNQT);
  }

  convertBalanceInSatoshi(balanceNQT: string) {
    // TODO: get true value
    const burst_btc = 0.00000103;
    return this.convertNQTStringToNumber(balanceNQT) * burst_btc * 1E6;
  }

  convertBalanceInUsCent(balanceNQT: string) {
    const burst_btc = 0.00000102;
    const btc_usd = 3800.00;
    return this.convertNQTStringToNumber(balanceNQT) * burst_btc * btc_usd;
  }
}

