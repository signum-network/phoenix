import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {RouterModule} from '@angular/router';
import {SettingsResolver} from './settings.resolver';
import {I18nModule} from '../../layout/components/i18n/i18n.module';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule} from '@angular/material';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {ComponentsModule} from '../../components/components.module';

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
  declarations: [SettingsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        I18nModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        FuseSharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatIconModule,
        MatSlideToggleModule
    ],
  providers: [
    SettingsResolver,
  ]
})
export class SettingsModule {
}
