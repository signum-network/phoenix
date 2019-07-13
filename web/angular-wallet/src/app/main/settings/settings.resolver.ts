import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StoreService } from '../../store/store.service';
import { Settings } from 'app/settings';

@Injectable()
export class SettingsResolver implements Resolve<Promise<Settings>> {
  constructor(private storeService: StoreService) {
      this.storeService = storeService;
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Settings> {

    const settings = await this.storeService.getSettings();
    if(!settings.nodeVersion || settings.nodeVersion.length === 0){
        console.log('No version, wtf?')
    }

    return settings;
  }
}
