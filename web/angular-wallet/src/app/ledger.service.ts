import { Injectable } from '@angular/core';
import { Ledger, LedgerClientFactory } from '@signumjs/core';
import { StoreService } from './store/store.service';
import { constants } from './constants';
import { NodeInfo } from './shared/types';
import { syncMemo } from 'app/util/memo';


@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private readonly ledgerFactory: (nodeHost: string) => Ledger;

  /**
   * Gets the ledger with current settings.
   * Use this getter to interact with the Signum Ledger.
   * Note: This is a factory, i.e. don't do something like: this.ledger = ledgerService.ledger
   */
  public get ledger(): Ledger {
    const { nodeUrl } = this.storeService.getSelectedNode();
    return this.ledgerFactory(nodeUrl);
  }

  constructor(private storeService: StoreService) {
    this.ledgerFactory = syncMemo((nodeHost: string) => {
      console.log('Creating new node', nodeHost);
      let reliableNodeHosts = [];
      const { networkName } = this.storeService.getSelectedNode();
      if (networkName === 'Signum'){
        reliableNodeHosts = constants.nodes
          .filter(({ reliable }) => reliable)
          .map(({ address, port }) => `${address}:${port}`);
      }
      return LedgerClientFactory.createClient({
        nodeHost,
        reliableNodeHosts,
      });
    });
  }

  async determineBestNode(): Promise<NodeInfo> {
    try {
      const nodeUrl = await this.ledger.service.selectBestHost(false);
      const { networkName, addressPrefix } = await this.ledger.network.getNetworkInfo();
      return {
        nodeUrl,
        networkName,
        addressPrefix
      };
    } catch (e) {
      console.warn(e);
      return this.storeService.getSelectedNode();
    }
  }

}
