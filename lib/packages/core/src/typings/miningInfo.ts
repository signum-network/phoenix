/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Mining Info Response
 * @module core
 */
export interface MiningInfo {

    readonly height: number;
    readonly generationSignature: string;
    readonly baseTarget: number;
    readonly averageCommitmentNQT: string;
    readonly lastBlockReward: number;
}
