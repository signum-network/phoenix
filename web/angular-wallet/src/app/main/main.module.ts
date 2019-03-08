import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { MainComponent } from './main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginGuard } from 'app/login/login-guard.service';
import { TransactionsModule } from './transactions/transactions.module';
import { SendBurstModule } from './send-burst/send-burst.module';
import { AccountsModule } from './accounts/accounts.module';
import { AliasesModule } from './aliases/aliases.module';
import { BlocksModule } from './blocks/blocks.module';
import { PeersModule } from './peers/peers.module';
import { MessagesModule } from './messages/messages.module';
import { SetAccountInfoModule } from './set-account-info/set-account-info.module';

const mainRoutes: Routes = [
  {
    path: '*',
    canActivate: [LoginGuard],
    redirectTo: 'dashboard'
  },
  {
    path: 'peers',
    loadChildren: './peers/peers.module#PeersModule'
  },
  {
    path: 'messages',
    loadChildren: './messages/messages.module#MessagesModule'
  },
  {
    path: 'blocks',
    loadChildren: './blocks/blocks.module#BlocksModule'
  },
  {
    path: 'aliases',
    loadChildren: './aliases/aliases.module#AliasesModule'
  },
  {
    path: 'transactions',
    loadChildren: './transactions/transactions.module#TransactionsModule'
  }
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
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
    DashboardModule,
    SendBurstModule,
    AccountsModule,
    AliasesModule,
    BlocksModule,
    PeersModule,
    MessagesModule,
    SetAccountInfoModule
  ],
  exports: [
    MainComponent
  ]
})

export class MainModule { }
