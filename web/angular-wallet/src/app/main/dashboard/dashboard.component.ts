import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { StoreService } from 'app/store/store.service';
import { Account } from '@burstjs/core';

@Component({
    selector     : 'dashboard-dashboard',
    templateUrl  : './dashboard.component.html',
    styleUrls    : ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DashboardComponent implements OnInit
{
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
        private storeService: StoreService) {
        // handle route reloads (i.e. if user changes accounts)
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.fetchTransactions();
            }
        });
    }
    
    fetchTransactions() {
        this.storeService.getSelectedAccount()
            .then((account) => {
                this.account = account;
                console.log(this.account);
            })
    }

    ngOnInit(): void {
        // Get the widgets from the service
        this.widgets = this._dashboardService.widgets;
        this.fetchTransactions();
    }
    
}

