import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AccountsComponent} from './accounts.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {DeleteDialogComponent} from './delete-account-dialog/delete-dialog.component';
import {RouterModule} from '@angular/router';
import {NotifierModule} from 'angular-notifier';
import {FuseSharedModule} from '@fuse/shared.module';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {LoginGuard} from 'app/login/login-guard.service';
import {AccountResolver} from 'app/shared/resolvers/account.resolver';
import {TransactionTableModule} from '../transactions/transaction-table/transaction.module';
import {AppSharedModule} from '../../shared/shared.module';
import {TokensModule} from '../tokens/tokens.module';
import { ComponentsModule } from 'app/components/components.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';


const routes = [
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'account/:id',
    component: AccountDetailsComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      // transactions: TransactionsResolver
    }
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FuseSharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    NotifierModule,
    RouterModule.forChild(routes),
    TransactionTableModule,
    AppSharedModule,
    TokensModule,
    ComponentsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDividerModule
  ],
  declarations: [
    AccountsComponent,
    DeleteDialogComponent,
    AccountDetailsComponent,
    ContactsTableComponent,
  ],
  providers: [
  ],
  entryComponents: [DeleteDialogComponent]
})
export class AccountsModule {
}
