import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from './sample/sample.module';
import { MainComponent } from './main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginGuard } from 'app/login/login-guard.service';
import { TransactionsModule } from './transactions/transactions.module';
import { SendBurstModule } from './send-burst/send-burst.module';
import { AccountsModule } from './accounts/accounts.module';
import { AliasesModule } from './aliases/aliases.module';

const mainRoutes: Routes = [
  {
    path: '*',
    canActivate: [LoginGuard],
    redirectTo: 'dashboard'
  }
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forChild(mainRoutes),

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
    DashboardModule,
    TransactionsModule,
    SendBurstModule,
    AccountsModule,
    AliasesModule
  ],
  exports: [
    MainComponent
  ]
})

export class MainModule { }
