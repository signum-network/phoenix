/** @module core */
/** @ignore */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@burstjs/crypto';
import {broadcastTransaction} from '../api/factories/transaction/broadcastTransaction';
import {BurstService} from '../service';
import {TransactionId} from '../typings/transactionId';

export interface UnsignedTransaction {
    unsignedHexMessage: string;
    senderPrivateKey: string;
    senderPublicKey: string;
}

/**
 * Signs and broadcasts a transaction
 *
 * @hidden
 * @param unsignedTransaction The unsigned transaction context
 * @param service The service used for
 * @param signFunc A custom signing function. Takes unsigned transaction bytes as a
 * hex string and returns the signed transaction bytes as a hex string. May be null.
 * Intended for hardware wallets as they perform signing independently.
 * @return The transaction Id
 */
export function signAndBroadcastTransaction(unsignedTransaction: UnsignedTransaction, service: BurstService,
                                            signFunc: (unsignedBytes: string) => Promise<string> = null): Promise<TransactionId> {
    return new Promise(async (resolve, reject) => {
        const {unsignedHexMessage, senderPrivateKey, senderPublicKey} = unsignedTransaction;

        const signature = signFunc == null ? generateSignature(unsignedHexMessage, senderPrivateKey) : await signFunc(unsignedHexMessage);
        if (!verifySignature(signature, unsignedHexMessage, senderPublicKey)) {
            reject('The signed message could not be verified! Transaction not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        resolve(await broadcastTransaction(service)(signedMessage));
    });
}
