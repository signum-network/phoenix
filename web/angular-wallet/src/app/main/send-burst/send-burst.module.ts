import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountResolver } from 'app/setup/account/account.resolver';
import { SendBurstComponent } from './send-burst.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  },
  {
    path: 'requestBurst',
    redirectTo: 'send',
    pathMatch: 'full'
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
