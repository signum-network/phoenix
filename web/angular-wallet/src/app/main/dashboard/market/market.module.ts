import {NgModule} from '@angular/core';
import {MarketOverviewComponent} from './market-overview.component';
import {
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatList,
  MatListItem,
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {MarketService} from './market.service';

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
    RouterModule
  ],
  providers: [
    MarketService
  ]
})
export class MarketModule {
}
