import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountResolver } from 'app/setup/account/account.resolver';
import { SendBurstComponent } from './send-burst.component';
import {
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatProgressSpinnerModule, MatChipsModule, MatBadgeModule, MatTooltipModule, MatDialogModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SetupModule } from 'app/setup/setup.module';
import { NotifierModule } from 'angular-notifier';
import { NgxMaskModule } from 'ngx-mask';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SuggestFeeResolver } from '../../network/suggest-fee.resolver';
import { NetworkModule } from 'app/network/network.module';
import { BurstInputValidatorDirective } from './send-burst-validator.directive';
import { LayoutModule } from 'app/layout/layout.module';
import { SendBurstFormComponent } from './send-burst-form/send-burst-form.component';
import { SendMultiOutFormComponent } from './send-multi-out-form/send-multi-out-form.component';
import { WarnSendDialogComponent } from './warn-send-dialog/warn-send-dialog.component';
import {PageModule} from '../../components/page/page.module';

const routes = [
  {
    path: 'send',
    component: SendBurstComponent,
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [
    SendBurstComponent,
    BurstInputValidatorDirective,
    SendBurstFormComponent,
    SendMultiOutFormComponent,
    WarnSendDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FuseSharedModule,
    SetupModule,
    NotifierModule,
    NgxMaskModule,
    I18nModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatCheckboxModule,
    NetworkModule,
    LayoutModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes),
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    PageModule
  ],
  entryComponents: [
    WarnSendDialogComponent
  ],
  exports: [
    BurstInputValidatorDirective
  ]
})
export class SendBurstModule { }
