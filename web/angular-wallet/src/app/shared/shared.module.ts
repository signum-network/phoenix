import {NgModule} from '@angular/core';
import {AmountPipe} from './pipes/amount.pipe';
import {PasteableAddressDirective} from './directives/pasteable-address.directive';
import { AddressPipe } from './pipes/address.pipe';
import { AccountResolver } from './resolvers/account.resolver';
import { I18nPipe } from './pipes/i18n.pipe';

// TODO: move more shared components, directive here! Still a bit cluttered in the entire project

@NgModule({
  imports: [],
  exports: [
    AmountPipe,
    AddressPipe,
    PasteableAddressDirective,
    I18nPipe,
  ],
  declarations: [
    AmountPipe,
    AddressPipe,
    PasteableAddressDirective,
    I18nPipe,
  ],
  providers: [
    AccountResolver,
  ]
})
export class AppSharedModule {
}
