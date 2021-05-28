/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {PlaceOrderArgs} from '../../../typings/args';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';

interface GenericPlaceOrderArgs extends PlaceOrderArgs {
    type: 'bid' | 'ask';
}

/**
 * @ignore
 * This is an internal helper
 * See details at [[AssetApi.placeAskOrder]] [[AssetApi.placeBidOrder]]
 * @module core.api.factories
 */
export const placeOrder = (service: BurstService):
    (args: GenericPlaceOrderArgs) => Promise<TransactionId> =>
    async (args: GenericPlaceOrderArgs): Promise<TransactionId> => {

        const {senderPrivateKey, senderPublicKey} = args;

        let parameters = {
            asset: args.asset,
            priceNQT: args.pricePlanck,
            quantityQNT: args.quantity,
            publicKey: senderPublicKey,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline,
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const method = args.type === 'ask' ? 'placeAskOrder' : 'placeBidOrder';
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>(method, parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        });

    };
