import {Injectable} from '@angular/core';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {NetworkService} from 'app/network/network.service';
import {BlockList} from '@signumjs/core';

@Injectable()
export class BlocksResolver implements Resolve<Promise<BlockList>> {
  constructor(private networkService: NetworkService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<BlockList> {
    return this.networkService.getBlocks();
  }
}
