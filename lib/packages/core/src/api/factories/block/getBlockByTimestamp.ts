/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {Block} from '../../../typings/block';
import { ApiError } from '../../../typings/api/apiError';

export const getBlockByTimestamp = (service: BurstService):
    (timestamp: number, includeTransactions: boolean) => Promise<Block | ApiError> =>
    (timestamp: number, includeTransactions: boolean): Promise<Block | ApiError> =>
        service.query('getBlock', {
            timestamp,
            includeTransactions
        });
