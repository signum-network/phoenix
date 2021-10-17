import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { LoginGuard } from 'app/login/login-guard.service';
import { AccountResolver } from 'app/setup/account/account.resolver';

import { TransactionTableModule } from '../transactions/transaction-table/transaction.module';

import { DashboardComponent } from './dashboard.component';
import { MatCheckboxModule } from '@angular/material';
import { AppSharedModule } from '../../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { SimpleDashboardComponent } from './simple-dashboard/simple-dashboard.component';
import { MinerDashboardComponent } from './miner-dashboard/miner-dashboard.component';
import { TraderDashboardComponent } from './trader-dashboard/trader-dashboard.component';
import { PowerDashboardComponent } from './power-dashboard/power-dashboard.component';
import { BalanceChartComponent } from './widgets/balance-chart/balance-chart.component';
import { MarketOverviewComponent } from './widgets/market/market-overview.component';
import { PerformanceComponent } from './widgets/performance/performance.component';
import { MatCardModule } from '@angular/material/card';
import { BalanceComponent } from './widgets/balance/balance.component';
import { ComponentsModule } from '../../components/components.module';
import { TransactionsTableComponent } from './widgets/transactions-table/transactions-table.component';
import { TokenComponent } from './widgets/token/token.component';
import { BlockforgedComponent } from './widgets/blockforged/blockforged.component';
import { BlockinfoComponent } from './widgets/blockinfo/blockinfo.component';
import { MiningpoolComponent } from './widgets/miningpool/miningpool.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver
    }
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    BalanceChartComponent,
    MarketOverviewComponent,
    PerformanceComponent,
    SimpleDashboardComponent,
    MinerDashboardComponent,
    TraderDashboardComponent,
    PowerDashboardComponent,
    BalanceComponent,
    TransactionsTableComponent,
    TokenComponent,
    BlockinfoComponent,
    BlockforgedComponent,
    MiningpoolComponent,
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
    MatChipsModule,
    MatCardModule,
    ComponentsModule
  ]
})
export class DashboardModule {
}

