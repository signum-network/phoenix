/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

export interface Block {
    readonly baseTarget: number;
    readonly block: string;
    readonly blockReward: string;
    readonly blockSignature: string;
    readonly generator: string;
    readonly generatorRS: string;
    readonly generationSignature: string;
    readonly generatorPublicKey: string;
    readonly height: number;
    readonly nextBlock: string;
    readonly nonce: string;
    readonly numberOfTransactions: number;
    readonly payloadHash: string;
    readonly payloadLength: number;
    readonly previousBlock: string;
    readonly previousBlockHash: string;
    readonly requestProcessingTime: number;
    readonly scoopNum: number;
    readonly timestamp: number;
    readonly totalAmountNQT: string;
    readonly totalFeeNQT: string;
    readonly transactions: string[] ;
    readonly version: number;
}

