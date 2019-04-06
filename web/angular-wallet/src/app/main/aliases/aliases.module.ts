import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliasesComponent } from './aliases.component';
import { AccountsResolver } from '../accounts/accounts.resolver';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatTableModule, MatTabsModule, MatSortModule, MatSelectModule, MatPaginatorModule, MatNativeDateModule, MatInputModule, MatIconModule, MatGridListModule, MatExpansionModule, MatDividerModule, MatDatepickerModule, MatChipsModule, MatCheckboxModule, MatCardModule, MatAutocompleteModule } from '@angular/material';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { AddAliasComponent } from './add-alias/add-alias.component';
import { SetupModule } from 'app/setup/setup.module';
import { NotifierModule } from 'angular-notifier';
import { NgxMaskModule } from 'ngx-mask';
import { NetworkModule } from 'app/network/network.module';
import { LoginGuard } from 'app/login/login-guard.service';
import { AccountResolver } from 'app/setup/account/account.resolver';
import { SuggestFeeResolver } from 'app/network/suggest-fee.resolver';
import { LayoutModule } from 'app/layout/layout.module';

const routes = [
  {
    path: '',
    component: AliasesComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountsResolver
    }
  },
  {
    path: 'add',
    component: AddAliasComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver, 
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [AliasesComponent, AddAliasComponent],
  imports: [
    CommonModule,
    FormsModule,
    SetupModule,
    NgxMaskModule,
    NetworkModule,
    LayoutModule,
    MatAutocompleteModule,
    FuseSharedModule,
    MatCardModule,
    MatCheckboxModule,
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
    MatButtonModule,
    ReactiveFormsModule,
    I18nModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class AliasesModule { }
