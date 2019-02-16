/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../burstService';
import { TransactionId } from '../../typings/transactionId';
import { TransactionResponse } from '../../typings/transactionResponse';
import { generateSignature, decryptAES, Keys } from '@burstjs/crypto';
import { verifySignature } from '@burstjs/crypto';
import { generateSignedTransactionBytes } from '@burstjs/crypto';
import { convertNumberToNQTString, convertNQTStringToNumber } from '@burstjs/util';
import { Transaction } from '../../typings/transaction';
import { constructAttachment } from '../message/constructMessage';
import {broadcastTransaction} from './broadcastTransaction';

/**
 * Sends burst to the blockchain
 *
 * The message will be broadcasted in two steps.
 * 1. Send the sendMoney call with public key to the network
 * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
 *
 * @param transaction The unsigned transaction
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param recipientAddress The recipients RS Address
 * @return The Transaction
 */
export const sendMoney = (service: BurstService):
    (transaction: Transaction, senderPublicKey: string, senderPrivateKey: string, recipientAddress: string) => Promise<TransactionId | Error> =>
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
