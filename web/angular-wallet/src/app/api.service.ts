import {Injectable} from '@angular/core';
import {Api, composeApi} from '@signumjs/core';
import {environment} from '../environments/environment';
import {Settings} from './settings';
import {StoreService} from './store/store.service';
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
    this.storeService.settings.subscribe(this.initApi.bind(this));
  }

  private async initApi(settings: Settings): Promise<void> {
    if (this.nodeUrl === settings.node) {
      return;
    }

    this.nodeUrl = settings.node;
    const reliablePeers = constants.nodes
      .filter(({reliable}) => reliable)
      .map(({address, port}) => `${address}:${port}`);

    this.api = composeApi({
      reliableNodeHosts: reliablePeers,
      nodeHost: this.nodeUrl,
      apiVersion: 0
    });
    this.brsVersion = undefined;

    if (settings.nodeAutoSelectionEnabled) {
      this.nodeUrl = await this.selectBestNode();
      settings.node = this.nodeUrl;
      await this.storeService.saveSettings(settings);
    }
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
