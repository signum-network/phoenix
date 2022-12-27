import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Alias } from '@signumjs/core';
import { AccountService } from '../../setup/account/account.service';

@Injectable()
export class AliasResolver implements Resolve<Promise<Alias>> {
  constructor(private accountService: AccountService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Alias> {
    return this.accountService.getAliasById(route.params.id);
  }
}

