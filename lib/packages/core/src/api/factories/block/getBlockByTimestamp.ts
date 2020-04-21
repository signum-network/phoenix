/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {Block} from '../../../typings/block';

/**
 * Use with [[ApiComposer]] and belongs to [[BlockApi]].
 *
 * See details at [[BlockApi.getBlockByTimestamp]]
 * @module core.api.factories
 */
export const getBlockByTimestamp = (service: BurstService):
    (timestamp: number, includeTransactions: boolean) => Promise<Block> =>
    (timestamp: number, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            timestamp,
            includeTransactions
        });
