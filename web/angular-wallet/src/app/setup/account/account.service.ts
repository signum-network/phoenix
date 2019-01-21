import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout'

import { StoreService } from "app/store/store.service";
import { Settings } from "app/settings";
import { Account } from "@burst/core";

@Injectable()
export class AccountService {
    private nodeUrl: string;

    public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(private storeService: StoreService) {
        this.storeService.settings.subscribe((settings: Settings) => {
            this.nodeUrl = settings.node;
        });
    }

    public setCurrentAccount(account: Account) {
        this.currentAccount.next(account);
    }

}
