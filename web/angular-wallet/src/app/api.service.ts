import {Injectable} from '@angular/core';
import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {environment} from '../environments/environment';
import {Settings} from './settings';
import {StoreService} from './store/store.service';
import {distinctUntilChanged} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api: Api;
  public nodeUrl = environment.defaultNode;

  constructor(private storeService: StoreService) {
    this.initApi = this.initApi.bind(this);

    this.storeService.ready.subscribe((settings: Settings) => {
      console.log('on ready');
      this.initApi(settings);
    });

    this.storeService.settings
      .pipe(
        distinctUntilChanged((s: Settings, t: Settings) => s.node === t.node),
      )
      .subscribe((settings: Settings) => {
        console.log('node changed');
        this.initApi(settings);
    });
  }

  private initApi(settings: Settings): void {
    this.nodeUrl = settings.node;
    const apiSettings = new ApiSettings(this.nodeUrl, 'burst');
    this.api = composeApi(apiSettings);
  }

}
