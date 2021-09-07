import {Injectable} from '@angular/core';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Account} from '@signumjs/core';
import {AccountService} from './account.service';
import {StoreService} from 'app/store/store.service';

@Injectable()
export class AccountResolver implements Resolve<Promise<Account>> {
  constructor(private storeService: StoreService,
              private accountService: AccountService) {

  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Account> {
    const account = await (route.params.id ?
      this.accountService.getAccount(route.params.id) :
      this.accountService.getCurrentAccount());

    const storedAccounts = await this.storeService.getAllAccounts();
    const storedAccount = storedAccounts.filter(a => a.account === account.account)
    if (storedAccount.length) {
      account.type = storedAccount[0].type;
    }
    return account;
  }
}



