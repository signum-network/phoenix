import { NgModule } from '@angular/core';
import { TransactionTableComponent } from './transaction-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {AppSharedModule} from '../../../shared/shared.module';
import {MatSortModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    TransactionTableComponent,
  ],
  exports: [
    TransactionTableComponent
  ],
  imports: [
    CommonModule,
    FuseSharedModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    AppSharedModule,
    MatSortModule,
    MatTooltipModule,
    ComponentsModule
  ]
})
export class TransactionTableModule { }
