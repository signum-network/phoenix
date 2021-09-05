import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TokensComponent} from './tokens.component';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {FuseSharedModule} from '@fuse/shared.module';
import {SetupModule} from 'app/setup/setup.module';
import {NgxMaskModule} from 'ngx-mask';
import {NetworkModule} from 'app/network/network.module';
import {LoginGuard} from 'app/login/login-guard.service';
import {LayoutModule} from 'app/layout/layout.module';
import {AppSharedModule} from 'app/shared/shared.module';
import {TokensTableComponent} from './tokens-table/tokens-table.component';
import {TokenTransferComponent} from './token-transfer/token-transfer.component';
import {SuggestFeeResolver} from '../../network/suggest-fee.resolver';
import {TokenTransferFormComponent} from './token-transfer/token-transfer-form/token-transfer-form.component';
import {CurrentAccountResolver} from '../../shared/resolvers/current-account.resolver';
import {TokenDataResolver} from './token-data-resolver.service';
import {ComponentsModule} from '../../components/components.module';

const routes = [
  {
    path: 'tokens',
    component: TokensComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: CurrentAccountResolver
    }
  },
  {
    path: 'transfer/:id',
    component: TokenTransferComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: CurrentAccountResolver,
      token: TokenDataResolver,
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [TokensComponent, TokensTableComponent, TokenTransferComponent, TokenTransferFormComponent],
  providers: [
    TokenDataResolver,
  ],
  exports: [
    TokensTableComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
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
    AppSharedModule,
  ]
})
export class TokensModule {
}
