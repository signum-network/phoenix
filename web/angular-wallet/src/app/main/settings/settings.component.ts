import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import semver from 'semver';
import { Settings } from '../../store/settings';
import { constants } from '../../constants';
import { environment } from '../../../environments/environment.hmr';
import { I18nService } from '../../layout/components/i18n/i18n.service';
import { StoreService } from '../../store/store.service';
import { ActivatedRoute } from '@angular/router';
import { LedgerClientFactory } from '@signumjs/core';
import { NotifierService } from 'angular-notifier';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../util/UnsubscribeOnDestroy';
import { ApiService } from '../../api.service';
import { AppService } from '../../app.service';

interface NodeInformation {
  url: string;
  networkName: string;
  version: string;
  addressPrefix: string;
}

const UnsupportedFeatures = {
  [constants.multiOutMinVersion]: 'node_hint_no_multiout'
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends UnsubscribeOnDestroy implements OnInit {
  public redirectedConnectionFailure: boolean;

  constructor(private i18nService: I18nService,
              private storeService: StoreService,
              private notifierService: NotifierService,
              private apiService: ApiService,
              private appService: AppService,
              private route: ActivatedRoute) {
    super();
  }

  public selectedNode = new FormControl();
  public showTestnet = new FormControl();
  public settings: Settings;

  public nodes = SettingsComponent.createNodeList(false);
  public isFetchingNodeInfo = false;
  public showAdvancedOptions = false;
  public showConnectionErrorIcon = false;
  public selectedNodeVersion: string;
  public isAutomatic = true;
  public showDesktopNotifications = true;
  public isDesktop = false;

  private static createNodeList(showTestnet: boolean): Array<any> {
    const nodes = constants.nodes
      .filter(({ testnet }) => showTestnet === testnet)
      .map(({ address, port }) => port !== 443 ? `${address}:${port}` : address)
      .sort();
    if (!environment.production) {
      nodes.push(environment.defaultNode);
    }
    return nodes;
  }

  static async fetchNodeInformation(nodeHost: string): Promise<NodeInformation> {
    const networkApi = LedgerClientFactory.createClient({
      nodeHost
    });
    const [networkInfo, blockchainStatus] = await Promise.all([
      networkApi.network.getNetworkInfo(),
      networkApi.network.getBlockchainStatus()
    ]);

    return {
      url: nodeHost,
      version: blockchainStatus.version,
      networkName: networkInfo.networkName,
      addressPrefix: networkInfo.addressPrefix
    };
  }

  async ngOnInit(): Promise<void> {
    this.settings = this.route.snapshot.data.settings as Settings;
    this.isDesktop = this.appService.isDesktop();
    this.selectedNode.setValue(this.settings.node);
    this.showTestnet.setValue(false);
    this.isAutomatic = this.settings.nodeAutoSelectionEnabled;
    this.showDesktopNotifications = this.settings.showDesktopNotifications;
    const waitASecond = debounceTime(1000);
    const updateVersion = () => {
      this.fetchNodeVersion();
    };

    this.storeService.ready$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async ready => {
        if (ready && this.route.snapshot.queryParams.connectionFail) {
          this.notifierService.notify('warning', this.i18nService.getTranslation('error_connection_fail'));
        }
      });

    this.selectedNode.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll),
        waitASecond
      ).subscribe(updateVersion);

    this.showTestnet.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
      this.nodes = SettingsComponent.createNodeList(this.showTestnet.value);
    });

    updateVersion();
  }

  private async getLastValidSettings(): Promise<void> {
    const { nodeUrl } = this.storeService.getSelectedNode();
    this.selectedNode.setValue(nodeUrl);
  }

  async selectNode(): Promise<void> {
    try {
      this.isFetchingNodeInfo = true;
      const nodeInformation = await SettingsComponent.fetchNodeInformation(this.selectedNode.value);
      this.isFetchingNodeInfo = false;
      this.storeService.setSelectedNode({
        nodeUrl: nodeInformation.url,
        networkName: nodeInformation.networkName,
        addressPrefix: nodeInformation.addressPrefix
      }, true);
      this.notifierService.notify('success', this.i18nService.getTranslation('node_set_success'));
    } catch (e) {
      await this.getLastValidSettings();
      this.notifierService.notify('error', this.i18nService.getTranslation('node_not_set'));
    }
  }

  getVersion(): string {
    return this.isFetchingNodeInfo ? this.i18nService.getTranslation('validating_node') : (this.selectedNodeVersion || this.i18nService.getTranslation('unknown_version'));
  }

  getUnsupportedFeatures(): string[] {
    if (this.isFetchingNodeInfo) {
      return [this.i18nService.getTranslation('contacting_node')];
    }

    const version = this.selectedNodeVersion;
    if (semver.valid(version)) {
      return Object
        .keys(UnsupportedFeatures)
        .filter(minVersion => semver.lte(version, minVersion))
        .map(minVersion => `${this.i18nService.getTranslation(UnsupportedFeatures[minVersion])} - (>= ${minVersion})`);
    }
    return [];
  }

  private async fetchNodeVersion(): Promise<void> {
    try {
      this.isFetchingNodeInfo = true;
      const { version } = await SettingsComponent.fetchNodeInformation(this.selectedNode.value);
      this.selectedNodeVersion = version;
      this.isFetchingNodeInfo = false;
      this.showConnectionErrorIcon = false;
    } catch (e) {
      this.showConnectionErrorIcon = true;
    }
  }

  async autoSelectNode(): Promise<void> {
    if (this.isFetchingNodeInfo) {
      return;
    }
    this.isFetchingNodeInfo = true;
    const bestNode = await this.apiService.selectBestNode();
    if (!bestNode) {
      this.notifierService.notify('error', this.i18nService.getTranslation('no_reliable_node_reachable'));
    } else if (bestNode.nodeUrl !== this.selectedNode.value) {
      this.selectedNode.setValue(bestNode.nodeUrl);
      await this.selectNode();
    }
    this.isFetchingNodeInfo = false;
  }

  async setSelectionMode(): Promise<void> {
    const currentSettings = this.storeService.getSettings();
    currentSettings.nodeAutoSelectionEnabled = this.isAutomatic;
    this.storeService.updateSettings(currentSettings);
    if (this.isAutomatic) {
      await this.autoSelectNode();
    }
  }

  setDesktopNotifications(): void {
    const currentSettings = this.storeService.getSettings();
    currentSettings.showDesktopNotifications = this.showDesktopNotifications;
    this.storeService.updateSettings(currentSettings);
    if (this.showDesktopNotifications) {
      this.appService.showDesktopMessage('Phoenix', this.i18nService.getTranslation('notifications_enabled'));
    }

  }
}
