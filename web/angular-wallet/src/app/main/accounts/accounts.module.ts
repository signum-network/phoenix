import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AccountsComponent} from './accounts.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {DeleteAccountDialogComponent} from './delete-account-dialog/delete-account-dialog.component';
import {RouterModule} from '@angular/router';
import {AccountsResolver} from './accounts.resolver';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {NotifierModule} from 'angular-notifier';
import {FuseSharedModule} from '@fuse/shared.module';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {LoginGuard} from 'app/login/login-guard.service';
import {AccountResolver} from 'app/setup/account/account.resolver';
import {TransactionsResolver} from '../transactions/transactions.resolver';
import {TransactionTableModule} from '../transactions/transaction-table/transaction.module';
import {AddNodeUrlPipe} from './account-details/add-node-url.pipe';
import { ConvertNQTStringPipe } from './account-details/convert-nqt-string';
import {AppSharedModule} from '../../shared/shared.module';


const routes = [
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountsResolver
    }
  },
  {
    path: 'account/:id',
    component: AccountDetailsComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      transactions: TransactionsResolver
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
        I18nModule,
        RouterModule.forChild(routes),
        TransactionTableModule,
        AppSharedModule
    ],
  declarations: [
    AccountsComponent,
    DeleteAccountDialogComponent,
    AccountDetailsComponent,
    AddNodeUrlPipe,
    ConvertNQTStringPipe
  ],
  providers: [
    AccountsResolver
  ],
  entryComponents: [DeleteAccountDialogComponent]
})
export class AccountsModule {
}
