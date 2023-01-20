import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {StoreService} from '../../store/store.service';
import { WalletAccount } from 'app/util/WalletAccount';

@Injectable()
export class CurrentAccountResolver implements Resolve<Promise<WalletAccount>> {
  constructor(private storeService: StoreService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<WalletAccount> {
    return this.storeService.getSelectedAccountLegacy();
  }
}
