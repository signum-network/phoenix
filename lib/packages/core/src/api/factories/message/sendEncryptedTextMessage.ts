/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {Keys} from '@burstjs/crypto';
import {encryptMessage} from '@burstjs/crypto';
import {convertNumberToNQTString} from '@burstjs/util';
import {signAndBroadcastTransaction} from '../../../internal';
import {DefaultDeadline} from '../../../constants';

const MAX_MESSAGE_LENGTH = 1024;

/**
 * Use with [[ApiComposer]] and belongs to [[MessageApi]].
 *
 * See details at [[MessageApi.sendEncryptedTextMessage]]
 */
export const sendEncryptedTextMessage = (service: BurstService):
    (message: string,
     recipientId: string,
     recipientPublicKey: string,
     senderKeys: Keys,
     deadline?: number,
     fee?: number,
     signFunc?: (unsignedBytes: string) => string,
    ) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        recipientPublicKey: string,
        senderKeys: Keys,
        deadline: number = DefaultDeadline,
        fee: number = 0.1,
        signFunc: (unsignedBytes: string) => string = null,
    ): Promise<TransactionId> => {

        const encryptedMessage = encryptMessage(message, recipientPublicKey, senderKeys.agreementPrivateKey);

        if ( encryptedMessage.data.length > MAX_MESSAGE_LENGTH ) {
            throw new Error(`The encrypted message exceeds allowed limit of ${MAX_MESSAGE_LENGTH} bytes`);
        }

        const parameters = {
            recipient: recipientId,
            publicKey: senderKeys.publicKey,
            encryptedMessageData: encryptedMessage.data,
            encryptedMessageNonce: encryptedMessage.nonce,
            messageToEncryptIsText: true,
            deadline: deadline,
            feeNQT: convertNumberToNQTString(fee),
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);

        const senderPublicKey = senderKeys.publicKey;
        const senderPrivateKey = senderKeys.signPrivateKey;
        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service, signFunc);
    };
