import {Injectable} from '@angular/core';
import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {environment} from '../environments/environment';
import { Settings } from './settings';
import { StoreService } from './store/store.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api: Api;
  public nodeUrl = environment.defaultNode;

  constructor(private storeService: StoreService){
    this.storeService.settings.subscribe((settings: Settings) => {
      this.nodeUrl = settings.node;
      const apiSettings = new ApiSettings(this.nodeUrl, 'burst');
      this.api = composeApi(apiSettings);
    });
  }

}
