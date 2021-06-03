/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {signAndBroadcastTransaction} from './signAndBroadcastTransaction';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {CreateSubscriptionArgs} from '../../../typings/args';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.createSubscription]]
 * @module core.api.factories
 */
export const createSubscription = (service: ChainService):
    (args: CreateSubscriptionArgs) => Promise<TransactionId> =>
    async (args: CreateSubscriptionArgs): Promise<TransactionId> => {

        let parameters = {
            amountNQT: args.amountPlanck,
            frequency: args.frequency,
            publicKey: args.senderPublicKey,
            recipient: args.recipientId,
            recipientPublicKey: args.recipientPublicKey || undefined,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMoneySubscription', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });

    };
