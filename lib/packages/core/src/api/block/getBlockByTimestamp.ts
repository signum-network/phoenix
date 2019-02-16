/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import {Block} from '../../typings/block';

export const getBlockByTimestamp = (service: BurstService):
    (timestamp: number, includeTransactions: boolean) => Promise<Block> =>
    (timestamp: number, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            timestamp,
            includeTransactions
        });
