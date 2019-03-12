import {Injectable} from '@angular/core';
import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public readonly api: Api;

  constructor(){
    const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
    this.api = composeApi(apiSettings);
  }

}
