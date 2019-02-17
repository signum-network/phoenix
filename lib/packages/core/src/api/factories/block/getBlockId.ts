/** @module core */
/** @ignore */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {BlockId} from '../../..';

export const getBlockId = (service: BurstService):
    (height: number) => Promise<BlockId> =>
    (height: number): Promise<BlockId> =>
        service.query('getBlockId', {
            height,
        });
