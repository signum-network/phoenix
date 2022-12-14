import {Injectable} from '@angular/core';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {AccountService} from './account.service';
import {StoreService} from 'app/store/store.service';
import { WalletAccount } from 'app/util/WalletAccount';

@Injectable()
export class AccountResolver implements Resolve<Promise<WalletAccount>> {
  constructor(private storeService: StoreService,
              private accountService: AccountService) {

  }

  async resolve(route: ActivatedRouteSnapshot): Promise<WalletAccount> {
    const account = await (route.params.id ?
      this.accountService.getAccount(route.params.id) :
      this.accountService.getCurrentAccount());

    const storedAccounts = await this.storeService.getAllAccounts();
    const storedAccount = storedAccounts.filter(a => a.account === account.account);
    if (storedAccount.length) {
      account.type = storedAccount[0].type;
    }
    await this.accountService.synchronizeAccount(account);
    return account;
  }
}



