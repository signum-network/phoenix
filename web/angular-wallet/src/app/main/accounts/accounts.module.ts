import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountsComponent } from './accounts.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatSortModule, MatCheckboxModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { RouterModule } from '@angular/router';
import { AccountsResolver } from './accounts.resolver';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { NotifierModule } from 'angular-notifier';
import { FuseSharedModule } from '@fuse/shared.module';


const routes = [
    {
      path: 'accounts',
      component: AccountsComponent,
      resolve: {
        account: AccountsResolver
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
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        NotifierModule,
        I18nModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AccountsComponent,
        DeleteAccountDialogComponent
    ],
    providers: [
        AccountsResolver
    ],
    entryComponents: [ DeleteAccountDialogComponent ]
})
export class AccountsModule { }
