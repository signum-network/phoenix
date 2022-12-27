import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AccountResolver} from 'app/setup/account/account.resolver';
import {RequestSignaComponent} from './request-signa.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {FormsModule} from '@angular/forms';
import {SetupModule} from 'app/setup/setup.module';
import {NotifierModule} from 'angular-notifier';
import {NgxMaskModule} from 'ngx-mask';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {SuggestFeeResolver} from '../../network/suggest-fee.resolver';
import {NetworkModule} from 'app/network/network.module';
import {LayoutModule} from 'app/layout/layout.module';
import {AppSharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../components/components.module';
import { QRCodeModule } from 'angularx-qrcode';
import { RequestQrCodeComponent } from './request-qr-code/request-qr-code.component';

const routes = [
  {
    path: '',
    component: RequestSignaComponent,
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [
    RequestSignaComponent, RequestQrCodeComponent,
  ],
  imports: [
    AppSharedModule,
    CommonModule,
    FormsModule,
    FuseSharedModule,
    I18nModule,
    LayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    NetworkModule,
    NgxMaskModule,
    NotifierModule,
    RouterModule.forChild(routes),
    SetupModule,
    ComponentsModule,
    QRCodeModule
  ],
  exports: []
})
export class RequestSignaModule {
}
