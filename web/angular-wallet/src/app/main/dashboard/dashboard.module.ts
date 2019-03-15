import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {ChartsModule} from 'ng2-charts';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components/widget/widget.module';

import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {LoginGuard} from 'app/login/login-guard.service';
import {TransactionTableModule} from '../transactions/transaction-table/transaction.module';
import {AccountResolver} from 'app/setup/account/account.resolver';
import {MarketService} from "./market/market.service";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
    resolve: {
      data: DashboardService,
      account: AccountResolver
    },
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    ChartsModule,
    NgxChartsModule,

    FuseSharedModule,
    FuseWidgetModule,
    I18nModule,
    TransactionTableModule
  ],
  providers: [
    DashboardService,
    MarketService
  ]
})
export class DashboardModule {
}

