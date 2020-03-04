/** @module core.api.factories */

/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {signAndBroadcastTransaction} from '../../../internal/signAndBroadcastTransaction';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {CancelSubscriptionArgs} from '../../../typings/args/cancelSubscriptionArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.cancelSubscription]]
 */
export const cancelSubscription = (service: BurstService):
    (args: CancelSubscriptionArgs) => Promise<TransactionId> =>
    async (args: CancelSubscriptionArgs): Promise<TransactionId> => {

        let parameters = {
            subscription: args.subscriptionId,
            publicKey: args.senderPublicKey,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('subscriptionCancel', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        }, service);

    };
