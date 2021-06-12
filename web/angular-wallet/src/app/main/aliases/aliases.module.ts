import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliasesComponent } from './aliases.component';
import { AccountsResolver } from '../accounts/accounts.resolver';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { AddAliasComponent } from './add-alias/add-alias.component';
import { SetupModule } from 'app/setup/setup.module';
import { NgxMaskModule } from 'ngx-mask';
import { NetworkModule } from 'app/network/network.module';
import { LoginGuard } from 'app/login/login-guard.service';
import { AccountResolver } from 'app/setup/account/account.resolver';
import { SuggestFeeResolver } from 'app/network/suggest-fee.resolver';
import { LayoutModule } from 'app/layout/layout.module';
import {PageModule} from '../../components/page/page.module';
import {AppSharedModule} from '../../shared/shared.module';
import {MatProgressSpinnerModule, MatRadioModule} from '@angular/material';

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
    MatTooltipModule,
    ReactiveFormsModule,
    I18nModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    PageModule,
    AppSharedModule,
    MatProgressSpinnerModule,
    MatRadioModule,
  ]
})
export class AliasesModule { }
