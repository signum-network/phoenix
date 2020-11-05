import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { DisclaimerComponent } from './disclaimer.component';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ]
})
export class DisclaimerModule {
}
