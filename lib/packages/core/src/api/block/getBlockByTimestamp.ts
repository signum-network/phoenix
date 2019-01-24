import {BurstService} from '../../burstService';
import {Block} from '../../typings/block';

/**
 * Get a block by given timestamp
 * @param timestamp The timestamp in seconds since Genesis Block
 * @param includeTransactions _true_, if transactions shall be included
 * @return The Block
 */
export const getBlockByTimestamp = (service: BurstService):
    (timestamp: number, includeTransactions: boolean) => Promise<Block> =>
    (timestamp: number, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            timestamp,
            includeTransactions
        });
