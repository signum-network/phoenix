import { Component, OnInit } from '@angular/core';
import semver from 'semver';
import { I18nService } from 'app/shared/services/i18n.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { LedgerService } from 'app/ledger.service';
import { AccountManagementService } from 'app/shared/services/account-management.service';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Settings } from 'app/store/settings';
import { constants } from 'app/constants';
import { environment } from '../../../../environments/environment.hmr';
import { LedgerClientFactory } from '@signumjs/core';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from "app/util/UnsubscribeOnDestroy";

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
  selector: 'settings-node-selector',
  templateUrl: './node-selector.component.html',
  styleUrls: ['./node-selector.component.scss']
})
export class NodeSelectorComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(private i18nService: I18nService,
              private storeService: StoreService,
              private notifierService: NotifierService,
              private ledgerService: LedgerService,
              private accountManagementService: AccountManagementService,
              private appService: AppService,
              private route: ActivatedRoute,
  ) {
    super();
  }

  public selectedNode = new FormControl();
  public showTestnet = new FormControl();
  public settings: Settings;

  public nodes = NodeSelectorComponent.createNodeList(false);
  public isFetchingNodeInfo = false;
  public showAdvancedOptions = false;
  public showConnectionErrorIcon = false;
  public selectedNodeVersion: string;
  public isAutomatic = true;
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
    this.settings = this.storeService.getSettings();
    this.isDesktop = this.appService.isDesktop();
    this.selectedNode.setValue(this.settings.node);
    this.showTestnet.setValue(false);
    this.isAutomatic = this.settings.nodeAutoSelectionEnabled;

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
        takeUntil(this.unsubscribeAll)
      ).subscribe(updateVersion);

    this.showTestnet.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
      this.nodes = NodeSelectorComponent.createNodeList(this.showTestnet.value);
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

      const { networkName: previousNetworkName } = this.storeService.getSelectedNode();
      const newNode = await NodeSelectorComponent.fetchNodeInformation(this.selectedNode.value);
      const networkChanged = newNode.networkName !== previousNetworkName;
      this.isFetchingNodeInfo = false;
      this.storeService.setSelectedNode({
        nodeUrl: newNode.url,
        networkName: newNode.networkName,
        addressPrefix: newNode.addressPrefix
      }, true);

      if (networkChanged) {
        const selectedAccount = this.accountManagementService.getSelectedAccount();
        const accountToBeSelected = this.accountManagementService.findAccount(selectedAccount.account, newNode.networkName);
        this.accountManagementService.selectAccount(accountToBeSelected).then(); // non-blocking update
      }

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
      const { version } = await NodeSelectorComponent.fetchNodeInformation(this.selectedNode.value);
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
    const bestNode = await this.ledgerService.determineBestNode();
    if (bestNode.nodeUrl !== this.selectedNode.value) {
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
}
