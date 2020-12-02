/** @ignore */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@burstjs/crypto';
import {broadcastTransaction} from './broadcastTransaction';
import {BurstService} from '../../../service';
import {TransactionId} from '../../../typings/transactionId';

export interface UnsignedTransaction {
    unsignedHexMessage: string;
    senderPrivateKey: string;
    senderPublicKey: string;
}

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.broadcastTransaction]]
 * @module core.api.factories
 */
export const signAndBroadcastTransaction = (burstService: BurstService):
    (unsignedTransaction: UnsignedTransaction) => Promise<TransactionId> =>
    async (unsignedTransaction): Promise<TransactionId> => {

        const {unsignedHexMessage, senderPrivateKey, senderPublicKey} = unsignedTransaction;

        const signature = generateSignature(unsignedHexMessage, senderPrivateKey);
        if (!verifySignature(signature, unsignedHexMessage, senderPublicKey)) {
            throw new Error('The signed message could not be verified! Transaction not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(burstService)(signedMessage);
    }
