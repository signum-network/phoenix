import {BurstService} from '../../burstService';
import {Block} from '../../typings/block';

/**
 * Get a block by given height
 * @param height The block height
 * @param includeTransactions _true_, if transactions shall be included
 * @return The Block
 */
export const getBlockByHeight = (service: BurstService):
    (height: number, includeTransactions: boolean) => Promise<Block> =>
    (height: number, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            height,
            includeTransactions
        });
