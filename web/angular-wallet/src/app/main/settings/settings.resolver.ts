import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {StoreService} from '../../store/store.service';
import {Settings} from 'app/store/settings';

@Injectable()
export class SettingsResolver implements Resolve<Promise<Settings>> {
  constructor(private storeService: StoreService) {
      this.storeService = storeService;
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Settings> {
    return await this.storeService.getSettingsLegacy();
  }
}
