import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionsComponent } from './transactions.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatInputModule, MatSortModule, MatDialogModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TransactionRowValueCellComponent } from './transaction-row-value-cell/transaction-row-value-cell.component';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';
import { TransactionDetailsComponent } from './transaction-details';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { LoginGuard } from 'app/login/login-guard.service';
import { TransactionsResolver } from './transactions.resolver';
import { AccountResolver } from 'app/setup/account/account.resolver';

const routes = [
    {
        path     : '',
        component: TransactionsComponent,
        canActivate: [LoginGuard],
        resolve: {
            transactions: TransactionsResolver,
            account: AccountResolver
        }
    },
    {
        path     : 'transaction/:id',
        component: TransactionDetailsComponent,
        canActivate: [LoginGuard],
        resolve: {
            transaction: TransactionResolver
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FuseSharedModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatTableModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        I18nModule,
        MatDialogModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        TransactionsComponent,
        TransactionRowValueCellComponent,
        TransactionDetailsComponent
    ],
    providers: [
        TransactionResolver,
        TransactionsResolver
    ]
})
export class TransactionsModule { }
