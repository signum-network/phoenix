import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {RepairComponent} from './repair.component';
import {MatButtonModule} from '@angular/material/button';
import {SettingsModule} from '../../main/settings/settings.module';
import {I18nModule} from '../../layout/components/i18n/i18n.module';

const routes = [
  {
    path: 'repair',
    component: RepairComponent
  }
];

@NgModule({
  declarations: [
    RepairComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatButtonModule,
    SettingsModule,
    I18nModule
  ]
})

export class RepairModule {
}
