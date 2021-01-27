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
import {StoreService} from 'app/store/store.service';
import {BehaviorSubject} from 'rxjs';
import {constants} from '../constants';


@Injectable()
export class NetworkService {
  private api: Api;
  public blocks: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(apiService: ApiService, private storeService: StoreService) {
    this.storeService.settings.subscribe(() => {
      this.api = apiService.api;
    });
  }

  public suggestFee(): Promise<SuggestedFees> {
    return this.api.network.getSuggestedFees();
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

  public setBlocks(blocks: Block[]) {
    this.blocks.next(blocks);
  }

  public addBlock(block: Block) {
    this.setBlocks([block].concat(this.blocks.value));
  }

  public async isMainNet(): Promise<boolean> {
    try {
      const {previousBlockHash} = await this.api.block.getBlockByHeight(constants.mainnetIndicator.block, false);
      return previousBlockHash === constants.mainnetIndicator.previousHash;
    } catch (e) {
      return false;
    }
  }
}
