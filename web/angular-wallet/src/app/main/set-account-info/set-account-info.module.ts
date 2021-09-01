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
import {PageModule} from '../../components/page/page.module';
import {SubmitTransactionModule} from '../../components/submit-transaction/submit-transaction.module';
import {FeeSelectorModule} from '../../components/fee-selector/fee-selector.module';

const routes = [
  {
    path: 'set-account-info',
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
        FeeSelectorModule
    ]
})
export class SetAccountInfoModule { }
