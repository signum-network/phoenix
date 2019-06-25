/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { TransactionId } from '../../../typings/transactionId';
import { TransactionResponse } from '../../../typings/transactionResponse';
import { Transaction } from '../../../typings/transaction';
import { generateSignature } from '@burstjs/crypto';
import { verifySignature } from '@burstjs/crypto';
import { generateSignedTransactionBytes } from '@burstjs/crypto';
import { convertNumberToNQTString } from '@burstjs/util';
import { broadcastTransaction } from './broadcastTransaction';

/**
 * @deprecated Will be substituted by [[sendSameAmountToMultipleRecipients]]
 *
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendMoneyMultiOut]]
 */
export const sendMoneyMultiOut = (service: BurstService):
    (transaction: Transaction,
     senderPublicKey: string,
     senderPrivateKey: string,
     recipients: string,
     sameAmount: boolean) => Promise<TransactionId | Error> =>
    async (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipients: string,
        sameAmount: boolean
    ): Promise<TransactionId | Error> => {

        const parameters = {
            publicKey: senderPublicKey,
            recipients: recipients,
            deadline: transaction.deadline || '1440',
            feeNQT: convertNumberToNQTString(parseFloat(transaction.feeNQT)),
            amountNQT: sameAmount ? convertNumberToNQTString(parseFloat(transaction.amountNQT)) : undefined
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>(
            sameAmount ? 'sendMoneyMultiSame' : 'sendMoneyMulti', parameters);
        const signature = generateSignature(unsignedHexMessage, senderPrivateKey);
        if (!verifySignature(signature, unsignedHexMessage, senderPublicKey)) {
            throw new Error('The signed message could not be verified! Transaction not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(service)(signedMessage);

    };
