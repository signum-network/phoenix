/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {BlockId} from '../../..';
import { ApiError } from '../../../typings/api/apiError';

export const getBlockId = (service: BurstService):
    (height: number) => Promise<BlockId | ApiError> =>
    (height: number): Promise<BlockId | ApiError> =>
        service.query('getBlockId', {
            height,
        });
