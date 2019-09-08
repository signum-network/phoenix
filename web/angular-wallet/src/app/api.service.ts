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
  public nodeEndpoint = environment.defaultNodeEndpoint;

  constructor(private storeService: StoreService) {
    this.initApi = this.initApi.bind(this);

    this.storeService.ready.subscribe(this.initApi);

    this.storeService.settings
      .pipe(
        distinctUntilChanged((s: Settings, t: Settings) => s.node === t.node),
      )
      .subscribe(this.initApi);
  }

  private static trimTrailingOrLeadingSlashes(path: string): string {
    let p = path;
    if (p.startsWith('/')) {
      p = p.substr(1);
    }

    if (p.endsWith('/')) {
      p = p.substr(0, p.length - 1);
    }
    return p;
  }

  private initApi(settings: Settings): void {
    this.nodeUrl = settings.node;
    this.nodeEndpoint = ApiService.trimTrailingOrLeadingSlashes(settings.nodeEndpoint || environment.defaultNodeEndpoint);
    const apiSettings = new ApiSettings(this.nodeUrl, this.nodeEndpoint);
    this.api = composeApi(apiSettings);
  }

}
