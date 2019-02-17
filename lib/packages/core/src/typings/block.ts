/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

export interface Block {
    readonly block: number ;
    readonly version: number ;
    readonly timestamp: number ;
    readonly height: number ;
    readonly previousBlockId: number ;
    readonly previousBlockHash: number[] ;
    readonly generatorPublicKey: number[] ;
    readonly totalAmountNQT: number ;
    readonly totalFeeNQT: number ;
    readonly payloadLength: number ;
    readonly generatorId: number ;
    readonly generatorRS: string ;
    readonly generationSignature: number[] ;
    readonly payloadHash: number[] ;
    readonly blockSignature: number[] ;
    readonly cumulativeDifficulty: number ;
    readonly baseTarget: number ;
    readonly nextBlockId: number ;
    readonly nonce: number ;
    readonly byteLength: number ;
    readonly pocTime: number ;
    readonly blockAts: number[] ;
    readonly transactions: string[] ;
    readonly numberOfTransactions: number ;
}
