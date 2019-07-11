import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {LoginGuard} from '../../login/login-guard.service';
import {RouterModule} from '@angular/router';
import {SettingsResolver} from './settings.resolver';
import {PageModule} from '../../components/page/page.module';
import {I18nModule} from '../../layout/components/i18n/i18n.module';

const routes = [
  {
    // TODO rename path to 'settings'
    path: '',
    component: SettingsComponent,
    resolve: {
      settings: SettingsResolver
    },
  }
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageModule,
    I18nModule
  ],
  providers: [
    SettingsResolver,
  ]
})
export class SettingsModule {
}
