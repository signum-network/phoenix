import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StoreService } from './store.service';
import { Settings } from 'app/store/settings';

@Injectable()
export class SettingsResolver implements Resolve<Settings> {
  constructor(private storeService: StoreService) {
      this.storeService = storeService;
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.storeService.getSettings();
  }
}
