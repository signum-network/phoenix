/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {Block} from '../../../typings/block';
import { ApiError } from '../../../typings/api/apiError';

export const getBlockByHeight = (service: BurstService):
    (height: number, includeTransactions: boolean) => Promise<Block | ApiError> =>
    (height: number, includeTransactions: boolean): Promise<Block | ApiError> =>
        service.query('getBlock', {
            height,
            includeTransactions
        });
