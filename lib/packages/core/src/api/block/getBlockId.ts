import {BurstService} from '../../burstService';
import {BlockId} from '../..';

/**
 * Get a block id by given height
 * @param {number} height The block height
 * @return {Promise<BlockId> } The Block Id
 */
export const getBlockId = (service: BurstService):
    (height: number) => Promise<BlockId> =>
    (height: number): Promise<BlockId> =>
        service.query('getBlockId', {
            height,
        });
