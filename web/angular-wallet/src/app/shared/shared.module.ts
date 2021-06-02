import {NgModule} from '@angular/core';
import {BurstAmountPipe} from './pipes/burst-amount.pipe';
import {AssetAmountPipe} from './pipes/asset-amount.pipe';
import {PasteableAddressDirective} from './directives/pasteable-address.directive';

// TODO: move more shared components, directive here! Still a bit cluttered in the entire project

@NgModule({
  imports: [],
  exports: [
    BurstAmountPipe,
    AssetAmountPipe,
    PasteableAddressDirective,
  ],
  declarations: [
    BurstAmountPipe,
    AssetAmountPipe,
    PasteableAddressDirective,
  ]
})
export class AppSharedModule {
}
