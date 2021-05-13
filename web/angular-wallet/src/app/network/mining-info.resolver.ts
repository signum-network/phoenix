import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MiningInfo } from '@burstjs/core';
import { NetworkService } from './network.service';

@Injectable()
export class MiningInfoResolver implements Resolve<Promise<MiningInfo>> {
  constructor(private networkService: NetworkService) {
      this.networkService = networkService;
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.networkService.getMiningInfo();
  }
}