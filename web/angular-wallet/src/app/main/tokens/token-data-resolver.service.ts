import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {StoreService} from '../../store/store.service';
import { TokenData, TokenService } from '../../shared/services/token.service';

@Injectable()
export class TokenDataResolver implements Resolve<Promise<TokenData>> {
  constructor(private tokenService: TokenService, private storeService: StoreService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<TokenData> {
    const currentAccount = this.storeService.getSelectedAccount();
    return this.tokenService.fetchTokenData(route.params.id, currentAccount);
  }
}
