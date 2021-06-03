/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';
import {CancelOrderArgs} from '../../../typings/args';
import {cancelOrder} from './cancelOrder';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.cancelBidOrder]].
 *
 * See details at [[AssetApi.cancelBidOrder]]
 * @module core.api.factories
 *
 */
export const cancelBidOrder = (service: ChainService):
    (args: CancelOrderArgs) => Promise<TransactionId> =>
    async (args: CancelOrderArgs): Promise<TransactionId> => {

        return cancelOrder(service)({
            type: 'bid',
            ...args,
        });

    };
