/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {IssueAssetArgs, PlaceOrderArgs} from '../../../typings/args';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';
import {placeOrder} from './placeOrder';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.placeBidOrder]].
 *
 * See details at [[AssetApi.placeBidOrder]]
 * @module core.api.factories
 *
 */
export const placeBidOrder = (service: BurstService):
    (args: PlaceOrderArgs) => Promise<TransactionId> =>
    async (args: PlaceOrderArgs): Promise<TransactionId> => {

        return placeOrder(service)({
            type: 'bid',
            ...args,
        });

    };
