import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { StoreService } from 'app/store/store.service';
import { Account } from '@burstjs/core';
import { convertNumericIdToAddress } from '@burstjs/util';
import { AccountService } from 'app/setup/account/account.service';

@Component({
    selector     : 'dashboard-dashboard',
    templateUrl  : './dashboard.component.html',
    styleUrls    : ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DashboardComponent implements OnInit {
    widgets: any;
    navigationSubscription: Subscription;
    account: Account;

    /**
     * Constructor
     *
     * @param {dashboardService} _dashboardService
     */
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
        this.account =  await this.storeService.getSelectedAccount();
        console.log(convertNumericIdToAddress(this.account.id));
        const accountTransactions = await this.accountService.getAccountTransactions(this.account.id);
        console.log(accountTransactions);
      } catch (e) {
        console.log(e);
      }
    }

    ngOnInit(): void {
        // Get the widgets from the service
        this.widgets = this._dashboardService.widgets;
        this.fetchTransactions();
    }

}

