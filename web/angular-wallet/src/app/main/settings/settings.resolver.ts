import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {StoreService} from '../../store/store.service';
import {Settings} from 'app/store/settings';

@Injectable()
export class SettingsResolver implements Resolve<Settings> {
  constructor(private storeService: StoreService) {
      this.storeService = storeService;
  }

  resolve(route: ActivatedRouteSnapshot): Settings {
    return this.storeService.getSettings();
  }
}
