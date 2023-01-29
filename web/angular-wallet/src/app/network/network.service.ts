import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import {
  Block,
  BlockchainStatus,
  SuggestedFees,
  Peer,
  PeerAddressList,
  BlockList, Address
} from '@signumjs/core';

import { ApiService } from '../api.service';
import { StoreService } from 'app/store/store.service';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants';
import { MiningInfo } from '@signumjs/core';

@Injectable()
export class NetworkService {

  // TODO: find a better way to deal with blocks
  public blocks: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private apiService: ApiService, private storeService: StoreService) {
  }

  public getSuggestedFees(): Promise<SuggestedFees> {
    return this.apiService.ledger.network.getSuggestedFees();
  }

  public getBlockchainStatus(): Promise<BlockchainStatus> {
    return this.apiService.ledger.network.getBlockchainStatus();
  }

  public getBlockById(id?: string): Promise<Block> {
    return this.apiService.ledger.block.getBlockById(id, false);
  }

  public getBlocks(firstIndex?: number, lastIndex?: number, includeTransactions?: boolean): Promise<BlockList> {
    return this.apiService.ledger.block.getBlocks(firstIndex, lastIndex, includeTransactions);
  }

  public getMiningInfo(): Promise<MiningInfo> {
    return this.apiService.ledger.network.getMiningInfo();
  }

  public getPeer(address: string): Promise<Peer> {
    return this.apiService.ledger.network.getPeer(address);
  }

  public getPeers(): Promise<PeerAddressList> {
    return this.apiService.ledger.network.getPeers();
  }

  public setBlocks(blocks: Block[]): void {
    this.blocks.next(blocks);
  }
  public addBlock(block: Block): void {
    this.setBlocks([block].concat(this.blocks.value));
  }

  public getBurnAddress(): Address {
    return Address.fromNumericId('0', this.getAddressPrefix());
  }

  public isMainNet(): boolean {
    return this.storeService.getSettings().networkName === 'Signum';
  }
  public getAddressPrefix(): string {
    return this.storeService.getSettings().addressPrefix;
  }

  public getChainExplorerHost(): string {
    return this.isMainNet() ? constants.explorerHost.main : constants.explorerHost.test;
  }

  public getIpfsCidUrl(cid: string): string {
    return `${constants.ipfsGateway}/${cid}`;
  }

}
