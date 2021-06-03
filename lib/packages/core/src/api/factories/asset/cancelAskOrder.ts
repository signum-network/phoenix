/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';
import {CancelOrderArgs} from '../../../typings/args';
import {cancelOrder} from './cancelOrder';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.cancelAskOrder]].
 *
 * See details at [[AssetApi.cancelAskOrder]]
 * @module core.api.factories
 *
 */
export const cancelAskOrder = (service: ChainService):
    (args: CancelOrderArgs) => Promise<TransactionId> =>
    async (args: CancelOrderArgs): Promise<TransactionId> => {

        return cancelOrder(service)({
            type: 'ask',
            ...args,
        });

    };
