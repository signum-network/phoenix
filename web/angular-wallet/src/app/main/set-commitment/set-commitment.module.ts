import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AccountResolver} from 'app/shared/resolvers/account.resolver';
import {SetCommitmentComponent} from './set-commitment.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SetupModule} from 'app/setup/setup.module';
import {NotifierModule} from 'angular-notifier';
import {NgxMaskModule} from 'ngx-mask';
import {FuseSharedModule} from '@fuse/shared.module';
import {SuggestFeeResolver} from '../../network/suggest-fee.resolver';
import {NetworkModule} from 'app/network/network.module';
import {LayoutModule} from 'app/layout/layout.module';
import {LoginGuard} from 'app/login/login-guard.service';
import {AppSharedModule} from '../../shared/shared.module';
import {MatProgressSpinnerModule, MatRadioModule, MatSlideToggleModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {SetCommitmentFormComponent} from './set-commitment-form/set-commitment-form.component';
import {ComponentsModule} from '../../components/components.module';

const routes = [
  {
    path: 'commitment',
    component: SetCommitmentComponent,
    canActivate: [LoginGuard],
    resolve: {
      account: AccountResolver,
      suggestedFees: SuggestFeeResolver
    }
  }
];

@NgModule({
  declarations: [
    SetCommitmentComponent,
    SetCommitmentFormComponent
  ],
    imports: [
        AppSharedModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        ComponentsModule,
        FormsModule,
        FuseSharedModule,
        LayoutModule,
        MatButtonModule,
        MatCheckboxModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTooltipModule,
        NetworkModule,
        NgxMaskModule,
        NotifierModule,
        RouterModule.forChild(routes),
        SetupModule,
    ]
})
export class SetCommitmentModule {
}
