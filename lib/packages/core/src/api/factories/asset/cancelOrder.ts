/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';
import {CancelOrderArgs} from '../../../typings/args';

interface GenericCancelOrderArgs extends CancelOrderArgs {
    type: 'bid' | 'ask';
}

/**
 * @ignore
 * This is an internal helper
 * See details at [[AssetApi.cancelAskOrder]] [[AssetApi.cancelBidOrder]]
 * @module core.api.factories
 */
export const cancelOrder = (service: BurstService):
    (args: GenericCancelOrderArgs) => Promise<TransactionId> =>
    async (args: GenericCancelOrderArgs): Promise<TransactionId> => {

        const {senderPrivateKey, senderPublicKey} = args;

        let parameters = {
            order: args.order,
            publicKey: senderPublicKey,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline,
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const method = args.type === 'ask' ? 'cancelAskOrder' : 'cancelBidOrder';
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>(method, parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        });

    };
