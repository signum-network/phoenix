import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountResolver } from 'app/shared/resolvers/account.resolver';
import { SetRewardRecipientComponent } from './set-reward-recipient.component';
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
import { FuseSharedModule } from '@fuse/shared.module';
import { SuggestFeeResolver } from '../../network/suggest-fee.resolver';
import { NetworkModule } from 'app/network/network.module';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginGuard } from 'app/login/login-guard.service';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ComponentsModule} from '../../components/components.module';
import { AppSharedModule } from "app/shared/shared.module";

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
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    FuseSharedModule,
    LayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    NetworkModule,
    NgxMaskModule,
    NgxSkeletonLoaderModule,
    NotifierModule,
    RouterModule.forChild(routes),
    SetupModule,
    AppSharedModule
  ]
})
export class SetRewardRecipientModule { }
