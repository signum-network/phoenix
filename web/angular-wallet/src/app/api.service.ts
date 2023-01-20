import { Injectable } from '@angular/core';
import { Api, LedgerClientFactory } from '@signumjs/core';
import { StoreService } from './store/store.service';
import { constants } from './constants';
import { NodeInfo } from './shared/types';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public ledger: Api;
  public nodeUrl: string;

  constructor(private storeService: StoreService) {
    this.storeService
      .ready$
      .subscribe(async (ready) => {
        if (!ready) {
          return;
        }
        const { nodeAutoSelectionEnabled, node } = this.storeService.getSettings();
        this.initApi(node);
        if (nodeAutoSelectionEnabled) {
          const nodeInfo = await this.selectBestNode();
          if (nodeInfo){
            this.storeService.setSelectedNode(nodeInfo);
          }
        }
      });

    this.storeService
      .nodeSelected$
      .subscribe((nodeInfo) => {
        if (nodeInfo) {
          this.initApi(nodeInfo.nodeUrl);
        }
      });

  }

  private initApi(nodeUrl: string): void {
    if (this.nodeUrl === nodeUrl) {
      return;
    }
    this.nodeUrl = nodeUrl;
    const reliablePeers = constants.nodes
      .filter(({ reliable }) => reliable)
      .map(({ address, port }) => `${address}:${port}`);

    this.ledger = LedgerClientFactory.createClient({
      reliableNodeHosts: reliablePeers,
      nodeHost: this.nodeUrl
    });
  }

  async selectBestNode(): Promise<NodeInfo|null> {
    try {
      const nodeUrl = await this.ledger.service.selectBestHost(false);
      const { networkName } = await this.ledger.network.getNetworkInfo();
      return {
        nodeUrl,
        networkName
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

}
