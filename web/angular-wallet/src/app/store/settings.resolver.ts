import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StoreService } from './store.service';
import { Settings } from 'app/settings';

@Injectable()
export class SettingsResolver implements Resolve<Promise<Settings>> {
  constructor(private storeService: StoreService) {
      this.storeService = storeService;
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.storeService.getSettings();
  }
}