/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {generateSignature} from '@burstjs/crypto';
import {verifySignature} from '@burstjs/crypto';
import {generateSignedTransactionBytes} from '@burstjs/crypto';
import {convertNumberToNQTString} from '@burstjs/util';
import {broadcastTransaction} from '../transaction/broadcastTransaction';

export const sendTextMessage = (service: BurstService):
    (message: string,
     recipientId: string,
     senderPublicKey: string,
     senderPrivateKey: string,
     deadline?: number,
     fee?: number) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = 1440,
        fee: number = 0.1,
    ): Promise<TransactionId> => {

        const parameters = {
            recipient: recipientId,
            publicKey: senderPublicKey,
            message,
            messageIsText: true,
            broadcast: true,
            deadline: 1440, // which deadline?
            feeNQT: convertNumberToNQTString(fee),
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);
        const signature = generateSignature(unsignedHexMessage, senderPrivateKey);
        if (!verifySignature(signature, unsignedHexMessage, senderPublicKey)) {
            throw new Error('The signed message could not be verified! Message not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(service)(signedMessage);
    };
