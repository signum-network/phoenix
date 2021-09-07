import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FuseSharedModule} from '@fuse/shared.module';
import {MessagesService} from './messages.service';
import {MessagesComponent} from './messages.component';
import {MessageStartComponent} from './message-start/message-start.component';
import {MessageViewComponent} from './message-view/message-view.component';
import {MessageSidenavComponent} from './sidenavs/left/message/message.component';
import {MessageUserSidenavComponent} from './sidenavs/left/user/user.component';
import {MessageLeftSidenavComponent} from './sidenavs/left/left.component';
import {MessageRightSidenavComponent} from './sidenavs/right/right.component';
import {MessageOptionsSidenavComponent} from './sidenavs/right/options/options.component';
import {LoginGuard} from 'app/login/login-guard.service';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {LayoutModule} from 'app/layout/layout.module';
import {NgxMaskModule} from 'ngx-mask';
import {SendBurstModule} from '../send-burst/send-burst.module';
import {SuggestFeeResolver} from 'app/network/suggest-fee.resolver';
import {NotifierModule} from 'angular-notifier';
import {FormsModule} from '@angular/forms';
import {AppSharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    canActivate: [LoginGuard],
    runGuardsAndResolvers: "always",
    resolve: {
      message: MessagesService,
      fees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [
    MessagesComponent,
    MessageViewComponent,
    MessageStartComponent,
    MessageSidenavComponent,
    MessageUserSidenavComponent,
    MessageLeftSidenavComponent,
    MessageRightSidenavComponent,
    MessageOptionsSidenavComponent,
  ],
  imports: [
    AppSharedModule,
    ComponentsModule,
    FormsModule,
    FuseSharedModule,
    I18nModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMaskModule,
    NotifierModule,
    RouterModule.forChild(routes),
    SendBurstModule,
  ],
  providers: [
    MessagesService
  ]
})
export class MessagesModule {
}
