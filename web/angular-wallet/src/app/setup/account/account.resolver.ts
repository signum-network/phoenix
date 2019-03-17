import {Injectable} from '@angular/core';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Account} from '@burstjs/core';
import {AccountService} from './account.service';
import {StoreService} from 'app/store/store.service';

@Injectable()
export class AccountResolver implements Resolve<Promise<Account>> {
  constructor(private storeService: StoreService,
              private accountService: AccountService) {

  }

  resolve(route: ActivatedRouteSnapshot): Promise<Account> {
    return route.params.id ?
      this.accountService.getAccount(route.params.id) :
      this.accountService.getCurrentAccount();
  }
}



