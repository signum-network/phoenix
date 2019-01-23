import AbstractModel from './abstractModel';

export class NetworkStatus extends AbstractModel {
    public numberOfPeers: number = undefined;
    public numberOfUnlockedAccounts: number = undefined;
    public numberOfTransfers: number = undefined;
    public numberOfOrders: number = undefined;
    public numberOfTransactions: number = undefined;
    public maxMemory: number = undefined;
    public isScanning: boolean = undefined;
    public cumulativeDifficulty: string = undefined;
    public freeMemory: number = undefined;
    public availableProcessors: number = undefined;
    public totalEffectiveBalanceNXT: number = undefined;
    public version: string = undefined;
    public lastBlock: string = undefined;
    public totalMemory: number = undefined;
    public application: string = undefined;
    public numberOfAliases: number = undefined;
    public lastBlockchainFeeder: string = undefined;
    public lastBlockchainFeederHeight: number = undefined;
    public time: number = undefined;
    public numberOfAskOrders: number = undefined;
    public numberOfAssets: number = undefined;
    public numberOfAccounts: number = undefined;
    public numberOfBlocks: number = undefined;
    public numberOfBidOrders: number = undefined;
    public numberOfTrades: number = undefined;

    constructor(data: any = {}) {
        super();
        this.mapJsonToProps(data);
    }
}
