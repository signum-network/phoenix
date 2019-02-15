import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction, Account } from '@burstjs/core';
import { AccountService } from './account.service';
import { StoreService } from 'app/store/store.service';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable()
export class AccountResolver implements Resolve<Promise<void|Account>> {
    constructor(private storeService: StoreService,
        private accountService: AccountService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.storeService.getSelectedAccount().catch(() => {});
    }
}



