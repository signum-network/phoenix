import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StoreService } from 'app/store/store.service';
import { WalletAccount } from '../../util/WalletAccount';

@Injectable()
export class AccountsResolver implements Resolve<WalletAccount[]> {
    constructor(private storeService: StoreService) {

    }

    resolve(route: ActivatedRouteSnapshot): WalletAccount[] {
      return this.storeService.getAllAccountsDistinct();
    }
}



