import {Injectable} from '@angular/core';
import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {environment} from '../environments/environment';
import {Settings} from './settings';
import {StoreService} from './store/store.service';
import {distinctUntilChanged} from 'rxjs/operators';
import semver from 'semver';
import {constants} from './constants';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api: Api;
  private brsVersion: string;
  public nodeUrl = environment.defaultNode;

  constructor(private storeService: StoreService) {
    this.initApi = this.initApi.bind(this);

    this.storeService.ready.subscribe(this.initApi);

    this.storeService.settings
      .subscribe(this.initApi);
  }

  private initApi(settings: Settings): void {
    if (this.nodeUrl === settings.node) {
      return;
    }

    this.nodeUrl = settings.node;
    const apiSettings = new ApiSettings(this.nodeUrl);
    this.api = composeApi(apiSettings);
    this.brsVersion = undefined;
  }

  async supportsPocPlus(): Promise<boolean> {
    const brsApiVersion = await this.fetchBrsApiVersion();
    const version = semver.coerce(brsApiVersion);
    return semver.gte(version, constants.pocPlusVersion, {includePrerelease: true});
  }

  async fetchBrsApiVersion(): Promise<string> {
    if (!this.brsVersion) {
      const {version} = await this.api.network.getBlockchainStatus();
      this.brsVersion = version;
    }
    return Promise.resolve(this.brsVersion);
  }

}
