import {NgModule} from '@angular/core';
import {AmountPipe} from './pipes/amount.pipe';
import {PasteableAddressDirective} from './directives/pasteable-address.directive';
import { AddressPipe } from './pipes/address.pipe';
import { AccountManagementService } from "./services/account-management.service";
import { AccountResolver } from "./resolvers/account.resolver";

// TODO: move more shared components, directive here! Still a bit cluttered in the entire project

@NgModule({
  imports: [],
  exports: [
    AmountPipe,
    AddressPipe,
    PasteableAddressDirective,
  ],
  declarations: [
    AmountPipe,
    AddressPipe,
    PasteableAddressDirective,
  ],
  providers: [
    AccountResolver,
  ]
})
export class AppSharedModule {
}
