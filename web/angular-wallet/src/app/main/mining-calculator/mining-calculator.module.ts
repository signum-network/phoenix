import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountResolver } from 'app/setup/account/account.resolver';
import { MiningCalculatorComponent } from './mining-calculator.component';
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
import { MiningInfoResolver} from '../../network/mining-info.resolver';
import { NetworkModule } from 'app/network/network.module';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginGuard } from 'app/login/login-guard.service';
import {PageModule} from '../../components/page/page.module';
import {SubmitTransactionModule} from '../../components/submit-transaction/submit-transaction.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const routes = [
  {
    path: 'mining-calculator',
    component: MiningCalculatorComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
     // getMiningInfo: MiningInfoResolver
    }
  }
];

@NgModule({
  declarations: [
    MiningCalculatorComponent,
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
    RouterModule.forChild(routes),
    PageModule,
    SubmitTransactionModule,
    NgxSkeletonLoaderModule
  ]
})
export class MiningCalculatorModule { }
