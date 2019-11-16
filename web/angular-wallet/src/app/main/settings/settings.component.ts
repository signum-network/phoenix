import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import semver from 'semver';
import {Settings} from '../../settings';
import {constants} from '../../constants';
import {environment} from '../../../environments/environment.hmr';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {StoreService} from '../../store/store.service';
import {ActivatedRoute} from '@angular/router';
import {ApiComposer, BurstService, getBlockchainStatus} from '@burstjs/core';
import {NotifierService} from 'angular-notifier';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';

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
export class SettingsComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(private i18nService: I18nService,
              private storeService: StoreService,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {
    super();
  }

  public selectedNode = new FormControl();
  public settings: Settings;

  public nodes = SettingsComponent.createNodeList();
  public isFetchingNodeInfo = false;
  public showAdvancedOptions = false;
  public showConnectionErrorIcon = false;
  public selectedNodeVersion: string;

  private static createNodeList(): Array<any> {
    return constants.nodes.map(({address, port}) => `${address}:${port}`).concat(environment.defaultNode);
  }

  static async fetchNodeInformation(nodeHost: string): Promise<NodeInformation> {
    const networkApi = ApiComposer
      .create(
        new BurstService({
          nodeHost
        }))
      .withNetworkApi({
        getBlockchainStatus,
      })
      .compose();
    const {version} = await networkApi.network.getBlockchainStatus();
    return {
      url: nodeHost,
      version
    };
  }

  async ngOnInit(): Promise<void> {
    this.settings = this.route.snapshot.data.settings as Settings;
    this.selectedNode.setValue(this.settings.node);
    const waitASecond = debounceTime(1000);
    const updateVersion = () => {
      this.fetchNodeVersion();
    };

    this.selectedNode.valueChanges.pipe(
      takeUntil(this.unsubscribeAll),
      waitASecond
    ).subscribe(updateVersion);

    updateVersion();
  }

  private async updateNodeSettings(value: NodeInformation): Promise<void> {
    const currentSettings = await this.storeService.getSettings();
    currentSettings.node = value.url;
    await this.storeService.saveSettings(currentSettings);
  }

  private async getLastValidSettings(): Promise<void> {
    const {node} = await this.storeService.getSettings();
    this.selectedNode.setValue(node);
  }

  async selectNode(): Promise<void> {
    try {
      this.isFetchingNodeInfo = true;
      const nodeInformation = await SettingsComponent.fetchNodeInformation(this.selectedNode.value);
      this.isFetchingNodeInfo = false;
      await this.updateNodeSettings(nodeInformation);
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
      const {version} = await SettingsComponent.fetchNodeInformation(this.selectedNode.value);
      this.selectedNodeVersion = version;
      this.isFetchingNodeInfo = false;
      this.showConnectionErrorIcon = false;
    } catch (e) {
      this.showConnectionErrorIcon = true;
    }
  }
}
