/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {generateSignature, Keys} from '@burstjs/crypto';
import {verifySignature, generateSignedTransactionBytes, encryptMessage} from '@burstjs/crypto';
import {convertNumberToNQTString} from '@burstjs/util';
import {broadcastTransaction} from '../transaction/broadcastTransaction';

const MAX_MESSAGE_LENGTH = 1024;

/**
 * @deprecated
 * <div class="deprecated">
 *     Use [[MessageApi.sendEncryptedMessage]] instead
 * </div>
 *
 * Use with [[ApiComposer]] and belongs to [[MessageApi]].
 *
 * See details at [[MessageApi.sendEncryptedTextMessage]]
 * @module core.api.factories
 */
export const sendEncryptedTextMessage = (service: BurstService):
    (message: string,
     recipientId: string,
     recipientPublicKey: string,
     senderKeys: Keys,
     deadline?: number,
     fee?: number) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        recipientPublicKey: string,
        senderKeys: Keys,
        deadline: number = DefaultDeadline,
        fee: number = 0.1,
    ): Promise<TransactionId> => {

        const encryptedMessage = encryptMessage(message, recipientPublicKey, senderKeys.agreementPrivateKey);

        if (encryptedMessage.data.length > MAX_MESSAGE_LENGTH) {
            throw new Error(`The encrypted message exceeds allowed limit of ${MAX_MESSAGE_LENGTH} bytes`);
        }

        const parameters = {
            recipient: recipientId,
            publicKey: senderKeys.publicKey,
            encryptedMessageData: encryptedMessage.data,
            encryptedMessageNonce: encryptedMessage.nonce,
            messageToEncryptIsText: true,
            deadline,
            feeNQT: convertNumberToNQTString(fee),
        };


        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);
        const signature = generateSignature(unsignedHexMessage, senderKeys.signPrivateKey);
        if (!verifySignature(signature, unsignedHexMessage, senderKeys.publicKey)) {
            throw new Error('The signed message could not be verified! Message not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(service)(signedMessage);
    };
