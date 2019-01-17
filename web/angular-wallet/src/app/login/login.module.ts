import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {routing} from './login.routing';
import {LoginComponent} from './login.component';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import {SharedModule} from '../../lib/shared.module';
// import {SetupModule} from '../dashboard/setup/setup.module';
// import {NotifierModule} from 'angular-notifier';
// import {I18nModule} from '../../lib/i18n/i18n.module';
// import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    routing,
    MatIconModule,
    FormsModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,

    // Material
    MatButtonModule,
    MatIconModule,

  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule
{
}
