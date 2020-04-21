/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Server Status
 *
 * @module core
 * */
export interface ServerStatus {
    readonly application: string;
    readonly availableProcessors: number;
    readonly cumulativeDifficulty: string;
    readonly freeMemory: number;
    readonly grpcApiEnabled: boolean;
    readonly grpcApiPort: number;
    readonly indirectIncomingServiceEnabled: boolean;
    readonly isScanning: boolean;
    readonly lastBlock: string;
    readonly lastBlockchainFeeder: string;
    readonly lastBlockchainFeederHeight: number;
    readonly maxMemory: number;
    readonly numberOfAccounts: number;
    readonly numberOfAliases: number;
    readonly numberOfAskOrders: number;
    readonly numberOfAssets: number;
    readonly numberOfBidOrders: number;
    readonly numberOfBlocks: number;
    readonly numberOfOrders: number;
    readonly numberOfPeers: number;
    readonly numberOfTrades: number;
    readonly numberOfTransactions: number;
    readonly numberOfTransfers: number;
    readonly numberOfUnlockedAccounts: number;
    readonly time: number;
    readonly totalEffectiveBalanceNXT: number;
    readonly totalMemory: number;
    readonly version: string;
}
