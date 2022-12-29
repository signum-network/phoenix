import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Alias } from '@signumjs/core';
import { AliasService } from './alias.service';

@Injectable()
export class AliasResolver implements Resolve<Promise<Alias>> {
  constructor(private aliasService: AliasService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Alias> {
    return this.aliasService.getAliasById(route.params.aliasId);
  }
}

