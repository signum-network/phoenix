import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import {
  Api,
  Block,
  BlockchainStatus,
  SuggestedFees,
  Peer,
  PeerAddressList
} from '@burstjs/core';

import {ApiService} from '../api.service';
import { StoreService } from 'app/store/store.service';
import { Settings } from 'app/settings';


@Injectable()
export class NetworkService {
  private api: Api;
  blocks: Block[];

  constructor(apiService: ApiService, private storeService: StoreService) {
    this.storeService.settings.subscribe(() => {
      this.api = apiService.api;
    });
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
