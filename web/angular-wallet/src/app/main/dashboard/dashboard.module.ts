import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ChartsModule} from 'ng2-charts';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components/widget/widget.module';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {LoginGuard} from 'app/login/login-guard.service';
import {AccountResolver} from 'app/setup/account/account.resolver';

import {TransactionTableModule} from '../transactions/transaction-table/transaction.module';

import {DashboardService} from './dashboard.service';
import {DashboardComponent} from './dashboard.component';
import {BalanceChartComponent} from './balance-chart/balance-chart.component';
import {MatCheckboxModule} from '@angular/material';
import {AppSharedModule} from '../../shared/shared.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {MarketOverviewComponent} from './market/market-overview.component';
import {PerformanceComponent} from './performance/performance.component';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';

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
    DashboardComponent,
    BalanceChartComponent,
    MarketOverviewComponent,
    PerformanceComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    MatToolbarModule,
    ChartsModule,
    NgxChartsModule,

    FuseSharedModule,
    FuseWidgetModule,
    I18nModule,
    TransactionTableModule,
    MatCheckboxModule,
    AppSharedModule,
    NgxSkeletonLoaderModule,
    MatGridListModule,
    MatTooltipModule,
    MatChipsModule
  ],
  providers: [
    DashboardService,
  ]
})
export class DashboardModule {
}

