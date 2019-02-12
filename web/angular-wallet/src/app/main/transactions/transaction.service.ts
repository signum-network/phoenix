import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { StoreService } from 'app/store/store.service';
import { Settings } from 'app/settings';
import { Account, compose, ApiSettings } from '@burstjs/core';
import { generateMasterKeys, Keys, encryptAES, hashSHA256, getAccountIdFromPublicKey } from '@burstjs/crypto';
import { isBurstAddress, convertNumericIdToAddress, convertAddressToNumericId } from '@burstjs/util';
import { environment } from 'environments/environment.prod';


@Injectable()
export class TransactionService {
    private api: any; //todo

    public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor() {
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.api = compose(apiSettings);
    }

    public getTransaction(id: string) {
        return this.api.transaction.getTransaction(id);
    }
}