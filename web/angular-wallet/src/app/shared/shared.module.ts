import {NgModule} from '@angular/core';
import {AmountPipe} from './pipes/amount.pipe';
import {PasteableAddressDirective} from './directives/pasteable-address.directive';
import {CurrentAccountResolver} from './resolvers/current-account.resolver';

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
  ],
  providers: [
    CurrentAccountResolver,
  ]
})
export class AppSharedModule {
}
