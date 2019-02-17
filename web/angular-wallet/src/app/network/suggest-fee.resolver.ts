import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SuggestedFees } from '@burstjs/core';
import { NetworkService } from './network.service';

@Injectable()
export class SuggestFeeResolver implements Resolve<Promise<SuggestedFees>> {
  constructor(private networkService: NetworkService) {
      this.networkService = networkService;
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.networkService.suggestFee();
  }
}