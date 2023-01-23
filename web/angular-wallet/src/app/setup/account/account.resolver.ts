import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AccountService } from './account.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from 'app/shared/services/account-management.service';

@Injectable()
export class AccountResolver implements Resolve<Promise<WalletAccount>> {
  constructor(private accountService: AccountService,
              private accountManagementService: AccountManagementService
  ) {

  }

  async resolve(route: ActivatedRouteSnapshot): Promise<WalletAccount> {
    return route.params.id ?
      this.accountService.getAccount(route.params.id) :
      this.accountManagementService.getSelectedAccount();
  }
}



