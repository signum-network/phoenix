import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { routing } from './login.routing';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetupModule } from 'app/setup/setup.module';

import { NotifierModule } from 'angular-notifier';
import { I18nModule } from '../layout/components/i18n/i18n.module';
import { NgxMaskModule } from 'ngx-mask';
import { LoginPassiveComponent } from './login-passive/login-passive.component';
import { LoginActiveComponent } from './login-active/login-active.component';
import {LoginLedgerComponent} from './login-ledger/login-ledger.component';

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
    SetupModule,
    NotifierModule,
    NgxMaskModule,
    I18nModule,

    // Material
    MatButtonModule,
    MatIconModule,

    SetupModule

  ],
  declarations: [
    LoginComponent,
    LoginPassiveComponent,
    LoginLedgerComponent,
    LoginActiveComponent,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}
