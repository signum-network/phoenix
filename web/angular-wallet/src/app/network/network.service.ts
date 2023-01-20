import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import {
  Api,
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
import { HttpError } from '@signumjs/http';
// TODO: newer version will have exported normally - update me
import { NetworkInfo } from '@signumjs/core/out/typings/networkInfo';
import { Router } from '@angular/router';

// @ts-ignore
const DefaultNetworkInfo: NetworkInfo = {
  networkName: 'Signum',
  genesisBlockId: '3444294670862540038',
  genesisAccountId: 0,
  maxBlockPayloadLength: 375360,
  maxArbitraryMessageLength: 1000,
  ordinaryTransactionLength: 176,
  addressPrefix: 'S',
  valueSuffix: 'SIGNA'
  // add more if needed
};

export interface MiningInfo {
  height: string;
  generationSignature: string;
  baseTarget: string;
  averageCommitmentNQT: string;
  lastBlockReward: string;
  timestamp: string;
}


@Injectable()
export class NetworkService {
  // private api: Api;
  public blocks: BehaviorSubject<any> = new BehaviorSubject([]);
  public networkInfo$: BehaviorSubject<NetworkInfo> = new BehaviorSubject(DefaultNetworkInfo);
  // private networkInfo: NetworkInfo = DefaultNetworkInfo;

  constructor(private apiService: ApiService, private storeService: StoreService, private router: Router) {

    // this.storeService.settings$.subscribe(async (nodeInfo) => {
    //   if (!nodeInfo) {
    //     return;
    //   }
    //   this.api = apiService.ledger;
    //   await this.fetchNetworkInfo();
    //   // TODO: refetch with nw network info
    //   // if (this.networkInfo.networkName !== networkInfo){
    //   //     this.storeService.invalidateAccountTransactions();
    //   // }
    // });
    // this.storeService.nodeChanged$.subscribe(async (nodeInfo) => {
    //   if (!nodeInfo) {
    //     return;
    //   }
    //   this.api = apiService.ledger;
    //   await this.fetchNetworkInfo();
    //   // TODO: refetch with nw network info
    //   // if (this.networkInfo.networkName !== networkInfo){
    //   //     this.storeService.invalidateAccountTransactions();
    //   // }
    // });
  }

  public getNetworkInfo(): NetworkInfo {
    return this.networkInfo$.getValue();
  }
  public suggestFee(): Promise<SuggestedFees> {
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
    return this.apiService.ledger.service.query('getMiningInfo');
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

  // FIXME: move this to store - and cache these information.
  // TODO: Move all the node selection things entirely to store...
  // TODO: Services must not be dependent on StoreService in their constructors
  public async fetchNetworkInfo(): Promise<void> {
    try {
      const networkInfo = await this.apiService.ledger.network.getNetworkInfo();
      this.networkInfo$.next(networkInfo);
    } catch (e) {
      console.warn('Could not fetch Network Information. Maybe wrong node configured...?', e.message);
      await this.router.navigate(['/settings'], {queryParams: { connectionFail: true }});
    }
  }

  public getBurnAddress(): Address {
    const {genesisBlockId, addressPrefix} = this.getNetworkInfo();
    return Address.fromNumericId(genesisBlockId, addressPrefix);
  }

  public isMainNet(): boolean {
    return this.getNetworkInfo().networkName === 'Signum';
  }
  public getAddressPrefix(): string {
    return this.getNetworkInfo().addressPrefix;
  }

  public getChainExplorerHost(): string {
    return this.isMainNet() ? constants.explorerHost.main : constants.explorerHost.test;
  }


  public getIpfsCidUrl(cid: string): string {
    return `${constants.ipfsGateway}/${cid}`;
  }

}
