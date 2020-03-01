import { NgModule } from '@angular/core';
import {BurstAmountPipe} from './pipes/burst-amount.pipe';

// TODO: move more shared components, directive here! Still a bit cluttered in the entire project

@NgModule({
  imports  : [
  ],
  exports  : [
    BurstAmountPipe,
  ],
  declarations: [
    BurstAmountPipe,
  ]
})
export class AppSharedModule
{
}
