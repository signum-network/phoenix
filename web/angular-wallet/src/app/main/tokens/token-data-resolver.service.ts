import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {TokenData, TokenService} from './token.service';
import {StoreService} from '../../store/store.service';

@Injectable()
export class TokenDataResolver implements Resolve<Promise<TokenData>> {
  constructor(private tokenService: TokenService, private storeService: StoreService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<TokenData> {
    const currentAccount = await this.storeService.getSelectedAccount();
    return this.tokenService.fetchTokenData(route.paramMap.get('id'), currentAccount);
  }
}
