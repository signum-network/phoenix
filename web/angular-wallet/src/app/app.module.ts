import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { AppComponent } from 'app/app.component';
import { MainModule } from './main/main.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { SetupModule } from './setup/setup.module';
import { LoginGuard } from './login/login-guard.service';
import { StoreService } from './store/store.service';
import { StoreConfig, appConfigFactory } from './store/store.config';
import { NetworkModule } from './network/network.module';
import { NotifierModule } from 'angular-notifier';
import { UtilService } from './util.service';
import { I18nModule } from './layout/components/i18n/i18n.module';
import { DisclaimerModule } from './disclaimer/disclaimer.module';
import { SettingsResolver } from './store/settings.resolver';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    canActivate: [LoginGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: true }),

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    // App modules
    LoginModule,
    MainModule,
    SetupModule,
    NetworkModule,

    NotifierModule,
    I18nModule,
    DisclaimerModule
  ],
  providers: [
    StoreService,
    { provide: StoreConfig, useFactory: appConfigFactory },
    UtilService,
    SettingsResolver
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
