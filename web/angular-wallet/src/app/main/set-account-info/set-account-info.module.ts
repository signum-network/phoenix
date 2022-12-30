import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountResolver } from 'app/setup/account/account.resolver';
import { SetAccountInfoComponent } from './set-account-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetupModule } from 'app/setup/setup.module';
import { NotifierModule } from 'angular-notifier';
import { NgxMaskModule } from 'ngx-mask';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SuggestFeeResolver } from '../../network/suggest-fee.resolver';
import { NetworkModule } from 'app/network/network.module';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginGuard } from 'app/login/login-guard.service';
import {ComponentsModule} from '../../components/components.module';
import { Src44DescriptionFormComponent } from './src44-description-form/src44-description-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  CustomDescriptionFormComponent
} from 'app/components/custom-description-form/custom-description-form.component';
import { JsonDescriptionFormComponent } from 'app/components/json-description-form/json-description-form.component';

const routes = [
  {
    path: 'set-account-profile',
    component: SetAccountInfoComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [
    SetAccountInfoComponent,
    Src44DescriptionFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    FuseSharedModule,
    I18nModule,
    LayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    NetworkModule,
    NgxMaskModule,
    NotifierModule,
    RouterModule.forChild(routes),
    SetupModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class SetAccountInfoModule { }
