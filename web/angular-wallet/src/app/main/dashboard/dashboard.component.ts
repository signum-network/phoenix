import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from './dashboard.service';
import { getAccountIdFromBurstAddress } from '@burst/crypto';

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
    selectedAccount = {
        address: 'BURST-HT4V-8H5E-ESS5-223SB',
        accountId: ''
    }

    /**
     * Constructor
     *
     * @param {dashboardService} _dashboardService
     */
    constructor(private _dashboardService: DashboardService) {

        // temporary example
        getAccountIdFromBurstAddress(this.selectedAccount.address).then((accountId) => {
            this.selectedAccount.accountId = accountId;
        });
    }

    ngOnInit(): void {
        // Get the widgets from the service
        this.widgets = this._dashboardService.widgets;
    }

    getAccountIdFromBurstAddress(address: string) {
        getAccountIdFromBurstAddress(address);
    }

    
}

