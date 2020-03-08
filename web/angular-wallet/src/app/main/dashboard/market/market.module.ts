import {NgModule} from '@angular/core';
import {MarketOverviewComponent} from './market-overview.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {MarketService} from './market.service';
import {AppSharedModule} from '../../../shared/shared.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    MarketOverviewComponent,
  ],
  exports: [
    MarketOverviewComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    FuseSharedModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    AppSharedModule,
    NgxSkeletonLoaderModule
  ],
  providers: [
    MarketService,

  ]
})
export class MarketModule {
}
