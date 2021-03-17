/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {encryptMessage} from '@burstjs/crypto';
import {SendEncryptedMessageArgs} from '../../../typings/args/sendEncryptedMessageArgs';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';

const MAX_MESSAGE_LENGTH = 1024;

/**
 * Use with [[ApiComposer]] and belongs to [[MessageApi]].
 *
 * See details at [[MessageApi.sendEncryptedMessage]]
 * @module core.api.factories
 */
export const sendEncryptedMessage = (service: BurstService):
    (args: SendEncryptedMessageArgs) => Promise<TransactionId> =>
    async (args: SendEncryptedMessageArgs): Promise<TransactionId> => {

        const encryptedMessage = encryptMessage(args.message, args.recipientPublicKey, args.senderKeys.agreementPrivateKey);

        if (encryptedMessage.data.length > MAX_MESSAGE_LENGTH) {
            throw new Error(`The encrypted message exceeds allowed limit of ${MAX_MESSAGE_LENGTH} bytes`);
        }

        const parameters = {
            deadline: args.deadline || DefaultDeadline,
            encryptedMessageData: encryptedMessage.data,
            encryptedMessageNonce: encryptedMessage.nonce,
            feeNQT: args.feePlanck,
            messageToEncryptIsText: true,
            publicKey: args.senderKeys.publicKey,
            recipient: args.recipientId,
            recipientPublicKey: args.recipientPublicKey || undefined,
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderKeys.publicKey,
            senderPrivateKey: args.senderKeys.signPrivateKey,
            unsignedHexMessage
        });

    };
