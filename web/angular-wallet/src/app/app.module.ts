import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';

import 'hammerjs';

import {AppComponent} from 'app/app.component';
import {MainModule} from './main/main.module';
import {LoginModule} from './login/login.module';
import {LoginComponent} from './login/login.component';
import {SetupModule} from './setup/setup.module';
import {LoginGuard} from './login/login-guard.service';
import {StoreService} from './store/store.service';
import {appConfigFactory, StoreConfig} from './store/store.config';
import {NetworkModule} from './network/network.module';
import {NotifierModule} from 'angular-notifier';
import {UtilService} from './util.service';
import {I18nModule} from './layout/components/i18n/i18n.module';
import {DisclaimerModule} from './startup/disclaimer/disclaimer.module';
import {RepairModule} from './startup/repair/repair.module';
import {SettingsResolver} from './store/settings.resolver';
import {registerLocales} from './layout/components/i18n/locales';
import {NgxElectronModule} from 'ngx-electron';
import {NewVersionDialogComponent} from './components/new-version-dialog/new-version-dialog.component';
import {MatProgressBarModule} from '@angular/material';

registerLocales();

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '*',
    redirectTo: 'dashboard',
    canActivate: [LoginGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NewVersionDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DisclaimerModule,
    HttpClientModule,
    I18nModule,
    LoginModule,
    MainModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTooltipModule,
    NetworkModule,
    NgxElectronModule,
    NotifierModule,
    RepairModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    SetupModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    StoreService,
    {provide: StoreConfig, useFactory: appConfigFactory},
    UtilService,
    SettingsResolver
  ],
  entryComponents: [
    NewVersionDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
