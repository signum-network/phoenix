import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Block } from '@burstjs/core';
import { NetworkService } from 'app/network/network.service';

@Injectable()
export class BlockResolver implements Resolve<Promise<Block>> {
  constructor(private networkService: NetworkService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Block> {
    return this.networkService.getBlockById(route.params.id);
  }
}
