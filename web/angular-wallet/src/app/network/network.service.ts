import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import {
  composeApi,
  Api,
  ApiSettings,
  Block,
  BlockchainStatus,
  SuggestedFees,
  Peer,
  PeerAddressList
} from '@burstjs/core';
import {environment} from 'environments/environment.prod';


@Injectable()
export class NetworkService {
  private api: Api;
  blocks: Block[];

  constructor() {
    const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
    this.api = composeApi(apiSettings);
  }

  public suggestFee(): Promise<SuggestedFees> {
    return this.api.network.suggestFee();
  }

  public getBlockchainStatus(): Promise<BlockchainStatus> {
    return this.api.network.getBlockchainStatus();
  }

  public getBlockById(id?: string): Promise<Block> {
    return this.api.block.getBlockById(id, false);
  }

  public getBlocks(firstIndex?: number, lastIndex?: number, includeTransactions?: boolean): Promise<Block[]> {
    return this.api.block.getBlocks(firstIndex, lastIndex, includeTransactions);
  }

  public getPeer(address: string): Promise<Peer> {
    return this.api.network.getPeer(address);
  }

  public getPeers(): Promise<PeerAddressList> {
    return this.api.network.getPeers();
  }
}
