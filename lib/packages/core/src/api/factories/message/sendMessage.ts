/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {SendMessageArgs} from '../../../typings/args';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';

/**
 * Use with [[ApiComposer]] and belongs to [[MessageApi]].
 *
 * See details at [[MessageApi.sendMessage]]
 * @module core.api.factories
 */
export const sendMessage = (service: BurstService):
    (args: SendMessageArgs) => Promise<TransactionId> =>
    async (args: SendMessageArgs): Promise<TransactionId> => {

        const parameters = {
            message: args.message,
            publicKey: args.senderPublicKey,
            recipient: args.recipientId,
            recipientPublicKey: args.recipientPublicKey || undefined,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline,
            messageIsText: args.messageIsText !== false,
            broadcast: true,
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });

    };
