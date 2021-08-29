import {NgModule} from '@angular/core';
import {AmountPipe} from './pipes/amount.pipe';
import {PasteableAddressDirective} from './directives/pasteable-address.directive';

// TODO: move more shared components, directive here! Still a bit cluttered in the entire project

@NgModule({
  imports: [],
  exports: [
    AmountPipe,
    PasteableAddressDirective,
  ],
  declarations: [
    AmountPipe,
    PasteableAddressDirective,
  ]
})
export class AppSharedModule {
}
