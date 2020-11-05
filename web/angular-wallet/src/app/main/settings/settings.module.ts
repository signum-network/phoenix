import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {RouterModule} from '@angular/router';
import {SettingsResolver} from './settings.resolver';
import {PageModule} from '../../components/page/page.module';
import {I18nModule} from '../../layout/components/i18n/i18n.module';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {SettingsFormComponent} from '../../components/settings-form/settings-form.component';

const routes = [
  {
    path: '',
    component: SettingsComponent,
    resolve: {
      settings: SettingsResolver
    },
  }
];

@NgModule({
  declarations: [SettingsComponent, SettingsFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageModule,
    I18nModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FuseSharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule
  ],
  exports: [
    SettingsFormComponent
  ],
  providers: [
    SettingsResolver,
  ]
})
export class SettingsModule {
}
