import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliasesComponent } from './aliases.component';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { AddAliasComponent } from './add-alias/add-alias.component';
import { SetupModule } from 'app/setup/setup.module';
import { NgxMaskModule } from 'ngx-mask';
import { NetworkModule } from 'app/network/network.module';
import { LoginGuard } from 'app/login/login-guard.service';
import { AccountResolver } from 'app/shared/resolvers/account.resolver';
import { SuggestFeeResolver } from 'app/network/suggest-fee.resolver';
import { LayoutModule } from 'app/layout/layout.module';
import { AppSharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule, MatRadioModule } from '@angular/material';
import { ComponentsModule } from '../../components/components.module';
import { AliasResolver } from './alias.resolver';
import { EditAliasComponent } from './edit-alias/edit-alias.component';
import { EditAliasFormComponent } from './edit-alias/edit-alias-form/edit-alias-form.component';
import {
  Src44AliasDescriptionFormComponent
} from './edit-alias/src44-alias-description-form/src44-alias-description-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { VerifyAliasComponent } from './add-alias/verify-alias/verify-alias.component';
import { AddAliasWizardService } from './add-alias/add-alias-wizard.service';
import { ViewAliasComponent } from './view-alias/view-alias.component';
import { SellAliasComponent } from './sell-alias/sell-alias.component';
import { AliasService } from './alias.service';
import { CancelSaleAliasComponent } from './cancel-sale-alias/cancel-sale-alias.component';
import { BuyAliasComponent } from './buy-alias/buy-alias.component';

const routes = [
  {
    path: '',
    component: AliasesComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver
    }
  },
  {
    path: 'register',
    component: AddAliasComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  },
  {
    path: ':aliasId',
    component: EditAliasComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver,
      alias: AliasResolver
    }
  },
  {
    path: ':aliasId/view',
    component: ViewAliasComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver,
      alias: AliasResolver
    }
  },
  {
    path: ':aliasId/sale',
    component: SellAliasComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver,
      alias: AliasResolver
    }
  },
  {
    path: ':aliasId/sale-off',
    component: CancelSaleAliasComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver,
      alias: AliasResolver
    }
  },
  {
    path: ':aliasId/buy',
    component: BuyAliasComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver,
      alias: AliasResolver
    }
  },
];

@NgModule({
  declarations: [
    AliasesComponent,
    AddAliasComponent,
    EditAliasComponent,
    Src44AliasDescriptionFormComponent,
    EditAliasFormComponent,
    VerifyAliasComponent,
    ViewAliasComponent,
    SellAliasComponent,
    CancelSaleAliasComponent,
    BuyAliasComponent,
  ],
  providers: [AliasResolver, AliasService],
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
    MatDialogModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    AppSharedModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatStepperModule
  ]
})
export class AliasesModule {
}
