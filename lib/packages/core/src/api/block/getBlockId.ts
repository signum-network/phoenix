import {BurstService} from '../../burstService';
import {BlockId} from '../..';

/**
 * Get a block by given id
 * @param height The block height
 * @param includeTransactions _true_, if transactions shall be included
 * @return The Block Id
 */
export const getBlockId = (service: BurstService):
    (height: number) => Promise<BlockId> =>
    (height: number): Promise<BlockId> =>
        service.query('getBlockId', {
            height,
        });
