import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {SampleModule} from 'app/main/sample/sample.module';
import {DashboardModule} from './main/dashboard/dashboard.module';
import {LoginModule} from './main/login/login.module';
import {LoginGuard} from './main/login/login-guard.service';

const appRoutes: Routes = [
  {
    path: 'login',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    canActivate: [LoginGuard],
    runGuardsAndResolvers: 'always',
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
    RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,

    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule,
    LoginModule,
    DashboardModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
