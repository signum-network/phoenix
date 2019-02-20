import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { composeApi, ApiSettings, Block, BlockchainStatus, SuggestedFees, Api, ApiError } from '@burstjs/core';
import { environment } from 'environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class NetworkService {
    private api: Api; //todo

    constructor() {
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.api = composeApi(apiSettings);
    }

    public suggestFee(): Promise<SuggestedFees | ApiError> {
        return this.api.network.suggestFee();
    }

    public getBlockchainStatus(): Promise<BlockchainStatus | ApiError> {
        return this.api.network.getBlockchainStatus();    
    }

    public getBlockByHeight(height?: number): Promise<Block | ApiError> {
        return this.api.block.getBlockByHeight(height, false);
    }

}
