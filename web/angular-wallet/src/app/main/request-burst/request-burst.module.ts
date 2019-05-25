import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AccountResolver} from 'app/setup/account/account.resolver';
import {RequestBurstComponent} from './request-burst.component';
import {
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatCheckboxModule,
  MatStepperModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SetupModule} from 'app/setup/setup.module';
import {NotifierModule} from 'angular-notifier';
import {NgxMaskModule} from 'ngx-mask';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {SuggestFeeResolver} from '../../network/suggest-fee.resolver';
import {NetworkModule} from 'app/network/network.module';
import {LayoutModule} from 'app/layout/layout.module';
import {RequestBurstQrComponent} from './request-burst-qr/request-burst-qr.component';
import {PageModule} from '../../components/page/page.module';

const routes = [
  {
    path: '',
    component: RequestBurstComponent,
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [
    RequestBurstComponent, RequestBurstQrComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FuseSharedModule,
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
    MatStepperModule,
    RouterModule.forChild(routes),
    PageModule
  ],
  exports: []
})
export class RequestBurstModule {
}
