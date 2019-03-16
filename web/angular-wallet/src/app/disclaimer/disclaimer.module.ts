import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { DisclaimerComponent } from './disclaimer.component';
import { StoreService } from 'app/store/store.service';
import { MatButtonModule } from '@angular/material';


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
