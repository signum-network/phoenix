import { NgModule } from '@angular/core';
import { TransactionTableComponent } from './transaction-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  declarations: [
    TransactionTableComponent,
  ],
  exports: [
    TransactionTableComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    FuseSharedModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule
  ]
})
export class TransactionTableModule { }
