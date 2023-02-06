import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AccountResolver} from 'app/shared/resolvers/account.resolver';
import {SendMessageComponent} from './send-message.component';
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
import {FuseSharedModule} from '@fuse/shared.module';
import {SuggestFeeResolver} from '../../network/suggest-fee.resolver';
import {NetworkModule} from 'app/network/network.module';
import {LayoutModule} from 'app/layout/layout.module';
import {LoginGuard} from 'app/login/login-guard.service';
import {MatSelectModule} from '@angular/material/select';
import {AppSharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../components/components.module';
import {SendMessageFormComponent} from './send-message-form/send-message-form.component';
import { SendMessageService } from './send-message.service';

const routes = [
  {
    path: 'send-message',
    component: SendMessageComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  providers: [SendMessageService],
  declarations: [
    SendMessageComponent,
    SendMessageFormComponent,
  ],
  imports: [
    AppSharedModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    FuseSharedModule,
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
  ],
  entryComponents: [],
  exports: []
})
export class SendMessageModule {
}
