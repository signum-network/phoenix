import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TransactionsComponent} from './transactions.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {FuseSharedModule} from '@fuse/shared.module';
import {RouterModule} from '@angular/router';
import {TransactionDetailsComponent} from './transaction-details';
import {TransactionResolver} from './transaction.resolver';
import {LoginGuard} from 'app/login/login-guard.service';
import {TransactionTableModule} from './transaction-table/transaction.module';
import {TransactionRowValueCellComponent} from './transaction-details/transaction-row-value-cell/transaction-row-value-cell.component';
import {AppSharedModule} from 'app/shared/shared.module';
import {ComponentsModule} from '../../components/components.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseConfirmDialogModule } from '@fuse/components';

const routes = [
  {
    path: '',
    component: TransactionsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'transaction/:id',
    component: TransactionDetailsComponent,
    canActivate: [LoginGuard],
    resolve: {
      transaction: TransactionResolver
    }
  }
];

@NgModule({
  imports: [
    AppSharedModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    FuseSharedModule,
    MatButtonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TransactionTableModule,
    MatTooltipModule,
    FuseConfirmDialogModule,
  ],
  declarations: [
    TransactionsComponent,
    TransactionDetailsComponent,
    TransactionRowValueCellComponent
  ],
  providers: [
    TransactionResolver
  ],
})
export class TransactionsModule {
}
