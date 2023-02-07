import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { DisclaimerComponent } from './disclaimer.component';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from "../components/components.module";


const routes = [
  {
    path: 'disclaimer',
    component: DisclaimerComponent
  }
];

@NgModule({
  declarations: [
    DisclaimerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatButtonModule,
    ComponentsModule
  ]
})
export class DisclaimerModule {
}
