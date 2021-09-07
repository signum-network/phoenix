import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AccountResolver} from 'app/setup/account/account.resolver';
import {SendBurstComponent} from './send-burst.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {SetupModule} from 'app/setup/setup.module';
import {NotifierModule} from 'angular-notifier';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {SuggestFeeResolver} from '../../network/suggest-fee.resolver';
import {NetworkModule} from 'app/network/network.module';
import {LayoutModule} from 'app/layout/layout.module';
import {SendBurstFormComponent} from './send-burst-form/send-burst-form.component';
import {SendMultiOutFormComponent} from './send-multi-out-form/send-multi-out-form.component';
import {LoginGuard} from 'app/login/login-guard.service';
import {BatchRecipientsDialogComponent} from './batch-recipients-dialog/batch-recipients-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {DomainService} from './domain/domain.service';
import {AppSharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../components/components.module';

const routes = [
  {
    path: 'send',
    component: SendBurstComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  },
  {
    path: 'requestBurst', // from deeplink
    redirectTo: 'send',
    pathMatch: 'full'
  }
];

@NgModule({
  providers: [
    DomainService
  ],
  declarations: [
    SendBurstComponent,
    SendBurstFormComponent,
    SendMultiOutFormComponent,
    BatchRecipientsDialogComponent,
  ],
  imports: [
    AppSharedModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    FuseSharedModule,
    I18nModule,
    LayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    NetworkModule,
    NotifierModule,
    RouterModule.forChild(routes),
    SetupModule,
  ],
  entryComponents: [
    BatchRecipientsDialogComponent
  ],
  exports: []
})
export class SendBurstModule {
}
