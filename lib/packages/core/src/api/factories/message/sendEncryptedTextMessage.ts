/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {generateSignature} from '@burstjs/crypto';
import {verifySignature, generateSignedTransactionBytes, encryptMessage} from '@burstjs/crypto';
import {convertNumberToNQTString} from '@burstjs/util';
import {broadcastTransaction} from '../transaction/broadcastTransaction';

const MAX_MESSAGE_LENGTH = 1024;

export const sendEncryptedTextMessage = (service: BurstService):
    (message: string,
     recipientId: string,
     recipientPublicKey: string,
     senderPublicKey: string,
     senderPrivateKey: string,
     deadline?: number,
     fee?: number) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        recipientPublicKey: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = 1440,
        fee: number = 0.1,
    ): Promise<TransactionId> => {

        const encryptedMessage = encryptMessage(message, recipientPublicKey, senderPrivateKey);

        if ( encryptedMessage.data.length > MAX_MESSAGE_LENGTH ) {
            throw new Error(`The encrypted message exceeds allowed limit of ${MAX_MESSAGE_LENGTH} bytes`);
        }

        const parameters = {
            recipient: recipientId,
            publicKey: senderPublicKey,
            encryptedMessageData: encryptedMessage.data,
            encryptedMessageNonce: encryptedMessage.nonce,
            encryptedMessageIsText: true,
            broadcast: true,
            deadline,
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
