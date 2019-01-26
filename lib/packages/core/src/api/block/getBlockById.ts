/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import {Block} from '../../typings/block';

/**
 * Get a block by given id
 * @param id The block id
 * @param includeTransactions _true_, if transactions shall be included
 * @return The Block
 */
export const getBlockById = (service: BurstService):
    (block: string, includeTransactions: boolean) => Promise<Block> =>
    (block: string, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            block,
            includeTransactions
        });
