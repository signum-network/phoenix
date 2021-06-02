import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Account } from '@signumjs/core';
import { StoreService } from 'app/store/store.service';

@Injectable()
export class AccountsResolver implements Resolve<Promise<void|Account[]>> {
    constructor(private storeService: StoreService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.storeService.getAllAccounts().catch(() => {});
    }
}



