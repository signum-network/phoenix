import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SuggestedFees } from '@signumjs/core';
import { NetworkService } from './network.service';

@Injectable()
export class SuggestFeeResolver implements Resolve<Promise<SuggestedFees>> {
  constructor(private networkService: NetworkService) {
      this.networkService = networkService;
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<SuggestedFees> {
    return this.networkService.getSuggestedFees();
  }
}
