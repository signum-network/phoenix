/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Blockchain Status
 * @module core
 */
export interface BlockchainStatus {
    readonly application: string;
    readonly cumulativeDifficulty: string;
    readonly isScanning: boolean;
    readonly lastBlock: string;
    readonly lastBlockchainFeeder: string;
    readonly lastBlockchainFeederHeight: number;
    readonly numberOfBlocks: number;
    readonly time: number;
    readonly version: string;
}
