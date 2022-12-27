import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
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
import {SendMoneyModule} from './send-money/send-money.module';
import {AccountsModule} from './accounts/accounts.module';
import {SetAccountInfoModule} from './set-account-info/set-account-info.module';
import {SetRewardRecipientModule} from './set-reward-recipient/set-reward-recipient.module';
import {SetCommitmentModule} from './set-commitment/set-commitment.module';

const mainRoutes: Routes = [
  {
    path: '*',
    canActivate: [LoginGuard],
    redirectTo: 'dashboard'
  },
  {
    path: 'peers',
    loadChildren: () => import('./peers/peers.module').then(p => p.PeersModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)
  },
  {
    path: 'blocks',
    loadChildren: () => import('./blocks/blocks.module').then(b => b.BlocksModule)
  },
  {
    path: 'aliases',
    loadChildren: () => import('./aliases/aliases.module').then(a => a.AliasesModule)
  },
  {
    path: 'tokens',
    loadChildren: () => import('./tokens/tokens.module').then(a => a.TokensModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(t => t.TransactionsModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request-signa/request-signa.module').then(r => r.RequestSignaModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(s => s.SettingsModule)
  },
];

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    AccountsModule,
    DashboardModule,
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMomentDateModule,
    RouterModule.forChild(mainRoutes),
    SendMoneyModule,
    SetAccountInfoModule,
    SetCommitmentModule,
    SetRewardRecipientModule,
    TranslateModule.forRoot(),
  ],
  exports: [
    MainComponent
  ]
})

export class MainModule {
}
