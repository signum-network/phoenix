import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountResolver } from 'app/setup/account/account.resolver';
import { SetRewardRecipientComponent } from './set-reward-recipient.component';
import { MatIconModule, MatInputModule, MatButtonModule, MatGridListModule, MatCheckboxModule } from '@angular/material';
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

const routes = [
  {
    path: 'set-reward-recipient',
    component: SetRewardRecipientComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver, 
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [ 
    SetRewardRecipientComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    FuseSharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    SetupModule,
    NotifierModule,
    NgxMaskModule,
    I18nModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    NetworkModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class SetRewardRecipientModule { }
