/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

export interface TransactionResponse {
    readonly fullHash: string;
    readonly transaction: string;
    readonly signatureHash: string;
    readonly unsignedTransactionBytes: string;
    readonly transactionJSON: object;
    readonly broadcasted: boolean;
    readonly requestProcessingTime: number;
    readonly transactionBytes: string;
}


