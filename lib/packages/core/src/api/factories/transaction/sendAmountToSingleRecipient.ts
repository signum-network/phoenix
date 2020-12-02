/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {signAndBroadcastTransaction} from './signAndBroadcastTransaction';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {SendAmountArgs} from '../../../typings/args/sendAmountArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendAmountToSingleRecipient]]
 * @module core.api.factories
 */
export const sendAmountToSingleRecipient = (service: BurstService):
    (args: SendAmountArgs) => Promise<TransactionId> =>
    async (args: SendAmountArgs): Promise<TransactionId> => {

         let parameters = {
            amountNQT: args.amountPlanck,
            publicKey: args.senderPublicKey,
            recipient: args.recipientId,
            recipientPublicKey: args.recipientPublicKey || undefined,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMoney', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });

    };
