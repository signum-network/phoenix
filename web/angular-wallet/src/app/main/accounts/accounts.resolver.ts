import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from 'app/shared/services/account-management.service';

@Injectable()
export class AccountsResolver implements Resolve<WalletAccount[]> {
    constructor(private accountManagementService: AccountManagementService) {

    }

    resolve(route: ActivatedRouteSnapshot): WalletAccount[] {
      return this.accountManagementService.getAllAccounts();
    }
}



