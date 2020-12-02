/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {SetRewardRecipientArgs} from '../../../typings/args/setRewardRecipientArgs';
import {DefaultDeadline} from '../../../constants';
import {signAndBroadcastTransaction} from '../transaction';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setRewardRecipient]]
 * @module core.api.factories
 */
export const setRewardRecipient = (service: BurstService):
    (args: SetRewardRecipientArgs) => Promise<TransactionId> =>
    async (args: SetRewardRecipientArgs): Promise<TransactionId> => {
        const parameters = {
            publicKey: args.senderPublicKey,
            recipient: args.recipientId,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('setRewardRecipient', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });

    };
