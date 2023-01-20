import {Injectable} from '@angular/core';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {AccountService} from './account.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from 'app/shared/services/account-management.service';

@Injectable()
export class AccountResolver implements Resolve<Promise<WalletAccount>> {
  constructor(private accountService: AccountService,
              private accountManagementService: AccountManagementService
  ) {

  }

  async resolve(route: ActivatedRouteSnapshot): Promise<WalletAccount> {
    const account = await (route.params.id ?
      this.accountService.getAccount(route.params.id) :
      this.accountManagementService.getSelectedAccount());

    console.log('AccountResolver:', account);

    // const storedAccounts = await this.storeService.getAllAccountsLegacy();
    // const storedAccount = storedAccounts.filter(a => a.account === account.account);
    // if (storedAccount.length) {
    //   account.type = storedAccount[0].type;
    // }
    return this.accountService.synchronizeAccount(account);
  }
}



