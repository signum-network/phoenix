import {NgModule} from '@angular/core';
import {AmountPipe} from './pipes/burst-amount.pipe';
import {AssetAmountPipe} from './pipes/asset-amount.pipe';
import {PasteableAddressDirective} from './directives/pasteable-address.directive';

// TODO: move more shared components, directive here! Still a bit cluttered in the entire project

@NgModule({
  imports: [],
  exports: [
    AmountPipe,
    AssetAmountPipe,
    PasteableAddressDirective,
  ],
  declarations: [
    AmountPipe,
    AssetAmountPipe,
    PasteableAddressDirective,
  ]
})
export class AppSharedModule {
}
