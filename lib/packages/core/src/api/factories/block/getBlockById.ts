/** @module core.api.factories */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {Block} from '../../../typings/block';


/**
 * Use with [[ApiComposer]] and belongs to [[BlockApi]].
 *
 * See details at [[BlockApi.getBlockById]]
 */
export const getBlockById = (service: BurstService):
    (block: string, includeTransactions: boolean) => Promise<Block> =>
    (block: string, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            block,
            includeTransactions
        });
