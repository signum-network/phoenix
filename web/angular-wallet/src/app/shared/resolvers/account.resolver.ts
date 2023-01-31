import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { StoreService } from 'app/store/store.service';
import { expMemo } from 'app/util/memo';


const fetchAccount = expMemo((key: string, accountId: string, accountService: AccountService) => {
  return accountService.getAccount(accountId);
});

@Injectable()
export class AccountResolver implements Resolve<Promise<WalletAccount>> {
  constructor(private accountService: AccountService,
              private storeService: StoreService,
  ) {

  }

  async resolve(route: ActivatedRouteSnapshot): Promise<WalletAccount|null> {
    const {networkName} = this.storeService.getSelectedNode();
    if(!route.params.id){
      return this.storeService.getSelectedAccount();
    }

    try{
      const accountId = route.params.id;
      const cacheKey = `${networkName}-${accountId}`;
      return (await fetchAccount(cacheKey, accountId, this.accountService) );
    } catch(e) {
      return null;
    }
  }
}



