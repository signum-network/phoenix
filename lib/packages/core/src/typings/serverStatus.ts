export interface ServerStatus {
    readonly numberOfPeers: number;
    readonly numberOfUnlockedAccounts: number;
    readonly numberOfTransfers: number;
    readonly numberOfOrders: number;
    readonly numberOfTransactions: number;
    readonly maxMemory: number;
    readonly isScanning: boolean;
    readonly cumulativeDifficulty: string;
    readonly freeMemory: number;
    readonly availableProcessors: number;
    readonly totalEffectiveBalanceNXT: number;
    readonly version: string;
    readonly lastBlock: string;
    readonly totalMemory: number;
    readonly application: string;
    readonly numberOfAliases: number;
    readonly lastBlockchainFeeder: string;
    readonly lastBlockchainFeederHeight: number;
    readonly time: number;
    readonly numberOfAskOrders: number;
    readonly numberOfAssets: number;
    readonly numberOfAccounts: number;
    readonly numberOfBlocks: number;
    readonly numberOfBidOrders: number;
    readonly numberOfTrades: number;
}
