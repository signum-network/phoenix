/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../burstService';
import { TransactionId } from '../../../typings/transactionId';
import { TransactionResponse } from '../../../typings/transactionResponse';
import { Transaction } from '../../../typings/transaction';
import { generateSignature, decryptAES, Keys } from '@burstjs/crypto';
import { verifySignature } from '@burstjs/crypto';
import { generateSignedTransactionBytes } from '@burstjs/crypto';
import { convertNumberToNQTString, convertNQTStringToNumber } from '@burstjs/util';
import { constructAttachment } from '../../../constructAttachment';
import {broadcastTransaction} from './broadcastTransaction';

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
            requestType: 'sendMoney',
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
