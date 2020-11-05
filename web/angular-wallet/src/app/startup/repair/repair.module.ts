import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { RepairComponent } from './repair.component';
import { MatButtonModule } from '@angular/material/button';
import {SettingsModule} from "../../main/settings/settings.module";

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
    SettingsModule
  ]
})

export class RepairModule {
}
