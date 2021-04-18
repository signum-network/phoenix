import {Injectable} from '@angular/core';
import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {environment} from '../environments/environment';
import {Settings} from './settings';
import {StoreService} from './store/store.service';
import semver from 'semver';
import {constants} from './constants';
import {ApiVersion} from '@burstjs/core/src/constants/apiVersion';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api: Api;
  private brsVersion: string;
  public nodeUrl = environment.defaultNode;

  constructor(private storeService: StoreService) {
    this.initApi = this.initApi.bind(this);

    // this.storeService.ready.subscribe((isReady) => isReady && this.initApi);

    this.storeService.settings
      .subscribe(this.initApi);
  }

  private async initApi(settings: Settings): Promise<void> {
    if (this.nodeUrl === settings.node) {
      return;
    }

    this.nodeUrl = settings.node;

    if (settings.nodeAutoSelectionEnabled) {
      this.nodeUrl = await this.selectBestNode();
      // const settings = await this.storeService.getSettings();
      settings.node = this.nodeUrl;
      await this.storeService.saveSettings(settings);
    }

    const reliablePeers = constants.nodes
      .filter(({reliable}) => reliable)
      .map(({address, port}) => `${address}:${port}`);

    const apiSettings = new ApiSettings(
      this.nodeUrl,
      ApiVersion.V1,
      reliablePeers,
    );
    this.api = composeApi(apiSettings);
    this.brsVersion = undefined;
  }

  async selectBestNode(): Promise<string> {
    let bestNode = '';
    try {
      bestNode = await this.api.service.selectBestHost(false);
    } catch (e) {
      console.log(e);
    }
    return bestNode;
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
