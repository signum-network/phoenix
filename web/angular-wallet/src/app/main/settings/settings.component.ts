import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import semver from 'semver';
import {Settings} from '../../settings';
import {constants} from '../../constants';
import {environment} from '../../../environments/environment.hmr';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {StoreService} from '../../store/store.service';
import {ActivatedRoute} from '@angular/router';
import {ApiComposer, BurstService, getBlockchainStatus, getServerStatus} from '@burstjs/core';
import {NotifierService} from 'angular-notifier';

interface NodeInformation {
  url: string;
  version: string;
}

const UnsupportedFeatures = {
  [constants.multiOutMinVersion]: 'node_hint_no_multiout',
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private i18nService: I18nService,
              private storeService: StoreService,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {
  }

  public selectedNode = new FormControl();
  public settings: Settings;

  public nodes = SettingsComponent.createNodeList();
  public isFetchingNodeInfo = false;

  private static createNodeList(): Array<NodeInformation> {
    return constants.nodes.map(({address, port}) => ({
        url: `${address}:${port}`,
        version: null,
      })
    ).concat({
      url: environment.defaultNode,
      version: null,
    });
  }

  static async fetchNodeInformation(url: string): Promise<NodeInformation> {
    try {
      const networkApi = ApiComposer
        .create(
          new BurstService({
            nodeHost: url,
            apiRootUrl: '/burst',
          }))
        .withNetworkApi({
          getBlockchainStatus,
        })
        .compose();
      const {version} = await networkApi.network.getBlockchainStatus();
      return {
        url,
        version,
      };
    } catch (e) {
      // no op
    }
    return null;
  }

  ngOnInit(): void {
    this.settings = this.route.snapshot.data.settings as Settings;
    this.selectedNode.setValue({
      url: this.settings.node,
      version: this.settings.nodeVersion
    });
  }

  displayNodeUrl = (value: NodeInformation): string => value.url;

  private async setNode(value: NodeInformation): Promise<void> {
    const currentSettings = await this.storeService.getSettings();
    currentSettings.nodeVersion = value.version;
    currentSettings.node = value.url;
    this.storeService.saveSettings(currentSettings);
    this.selectedNode.setValue(value);
  }

  async selectNode(): Promise<void> {
    this.isFetchingNodeInfo = true;
    const nodeDescriptor = await SettingsComponent.fetchNodeInformation(this.selectedNode.value.url);
    this.isFetchingNodeInfo = false;
    if (!nodeDescriptor) {
      const {node: url, nodeVersion: version} = await this.storeService.getSettings();
      this.selectedNode.setValue({
        url,
        version,
      });
      this.notifierService.notify('error', this.i18nService.getTranslation('node_not_set'));
      return;
    }
    await this.setNode(nodeDescriptor);
    this.notifierService.notify('success', this.i18nService.getTranslation('node_set_success'));
  }

  getVersion(): string {
    return this.isFetchingNodeInfo ? this.i18nService.getTranslation('validating_node') : (this.selectedNode.value.version || this.i18nService.getTranslation('unknown_version'));
  }

  getUnsupportedFeatures(): string[] {
    if (this.isFetchingNodeInfo) {
      return [this.i18nService.getTranslation('contacting_node')];
    }

    const {version} = this.selectedNode.value;
    if (semver.valid(version)) {
      return Object
        .keys(UnsupportedFeatures)
        .filter(minVersion => semver.lte(version, minVersion))
        .map(minVersion => `${this.i18nService.getTranslation(UnsupportedFeatures[minVersion])} - (>= ${minVersion})`);
    }
    return [];
  }
}
