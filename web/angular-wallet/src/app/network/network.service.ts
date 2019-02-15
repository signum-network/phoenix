import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { compose, ApiSettings } from '@burstjs/core';
import { environment } from 'environments/environment.prod';


@Injectable()
export class NetworkService {
    private api: any; //todo

    constructor() {
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.api = compose(apiSettings);
    }

    public suggestFee() {
        return this.api.network.suggestFee();
    } 
}