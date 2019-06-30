/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {generateSignature, verifySignature, generateSignedTransactionBytes} from '@burstjs/crypto';
import {convertNumberToNQTString} from '@burstjs/util';
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {Transaction} from '../../../typings/transaction';
import {constructAttachment} from '../../../internal/constructAttachment';
import {broadcastTransaction} from './broadcastTransaction';

/**
 * @deprecated use [[TransactionApi.sendAmount]]
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendMoney]]
 */
export const sendMoney = (service: BurstService):
    (transaction: Transaction,
     senderPublicKey: string,
     senderPrivateKey: string,
     recipientAddress: string) => Promise<TransactionId | Error> =>
    async (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipientAddress: string,
    ): Promise<TransactionId | Error> => {

        let parameters = {
            amountNQT: convertNumberToNQTString(parseFloat(transaction.amountNQT)),
            publicKey: senderPublicKey,
            recipient: recipientAddress,
            deadline: 1440,
            feeNQT: convertNumberToNQTString(parseFloat(transaction.feeNQT)),
        };
        if (transaction.attachment) {
            parameters = constructAttachment(transaction, parameters);
        }
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMoney', parameters);
        const signature = generateSignature(unsignedHexMessage, senderPrivateKey);
        if (!verifySignature(signature, unsignedHexMessage, senderPublicKey)) {
            throw new Error('The signed message could not be verified! Transaction not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(service)(signedMessage);

    };
