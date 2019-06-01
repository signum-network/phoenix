import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {LayoutModule} from 'app/layout/layout.module';
import {MainComponent} from './main.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {LoginGuard} from 'app/login/login-guard.service';
import {SendBurstModule} from './send-burst/send-burst.module';
import {AccountsModule} from './accounts/accounts.module';
import {SetAccountInfoModule} from './set-account-info/set-account-info.module';
import {SetRewardRecipientModule} from './set-reward-recipient/set-reward-recipient.module';

const mainRoutes: Routes = [
  {
    path: '*',
    canActivate: [LoginGuard],
    redirectTo: 'dashboard'
  },
  {
    path: 'peers',
    loadChildren: () => import('./peers/peers.module#PeersModule').then(p => p.PeersModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module#MessagesModule').then(m => m.MessagesModule)
  },
  {
    path: 'blocks',
    loadChildren: () => import('./blocks/blocks.module#BlocksModule').then(b => b.BlocksModule)
  },
  {
    path: 'aliases',
    loadChildren: () => import('./aliases/aliases.module#AliasesModule').then(a => a.AliasesModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module#TransactionsModule').then(t => t.TranslateModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request-burst/request-burst.module#RequestBurstModule').then(r => r.RequestBurstModule)
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
    SetAccountInfoModule,
    SetRewardRecipientModule
  ],
  exports: [
    MainComponent
  ]
})

export class MainModule {
}
