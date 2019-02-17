/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {Block} from '../../../typings/block';

export const getBlockByHeight = (service: BurstService):
    (height: number, includeTransactions: boolean) => Promise<Block> =>
    (height: number, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            height,
            includeTransactions
        });
