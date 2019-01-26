/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {broadcastTransaction} from '..';
import {BurstService} from '../../burstService';
import {BurstUtil} from '../../burstUtil';
import {TransactionId} from '../../typings/transactionId';
import {TransactionResponse} from '../../typings/transactionResponse';
import {generateSignature} from '../../../../crypto/src/generateSignature';
import {verifySignature} from '../../../../crypto/src/verifySignature';
import {generateSignedTransactionBytes} from '../../../../crypto/src/generateSignedTransactionBytes';

/**
 * Broadcasts a text message to the network/blockchain
 *
 * The message will be broadcasted in two steps.
 * 1. Send the message with public key to the network
 * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
 *
 * @param message The _text_ message to be sent
 * @param recipientId The recipients Id, not RS Address
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param fee The optional fee (expressed in Burst) for the message, default is 0.1 Burst.
 * @return The Transaction Id
 */
export const sendTextMessage = (service: BurstService):
    (message: string, recipientId: string, senderPublicKey: string, senderPrivateKey: string, fee?: number) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        fee: number = 0.1,
    ): Promise<TransactionId> => {

        const parameters = {
            recipient: recipientId,
            publicKey: senderPublicKey,
            message,
            messageIsText: true,
            broadcast: true,
            deadline: 1440, // which deadline?
            feeNQT: BurstUtil.convertNumberToString(fee),
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);
        const signature = generateSignature(unsignedHexMessage, senderPrivateKey);
        if (!verifySignature(signature, unsignedHexMessage, senderPublicKey)) {
            throw new Error('The signed message could not be verified! Message not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(service)(signedMessage);
    };
