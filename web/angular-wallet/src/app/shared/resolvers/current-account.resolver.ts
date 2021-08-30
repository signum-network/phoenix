import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Account } from '@signumjs/core';
import {StoreService} from '../../store/store.service';

@Injectable()
export class CurrentAccountResolver implements Resolve<Promise<Account>> {
  constructor(private storeService: StoreService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Account> {
    return this.storeService.getSelectedAccount();
  }
}
