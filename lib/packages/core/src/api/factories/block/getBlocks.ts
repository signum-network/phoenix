/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {Block} from '../../../typings/block';

export const getBlocks = (service: BurstService):
    (firstIndex?: number, lastIndex?: number, includeTransactions?: boolean) => Promise<Block[]> =>
    (firstIndex?: number, lastIndex?: number, includeTransactions?: boolean): Promise<Block[]> =>
        service.query('getBlocks', {
            firstIndex,
            lastIndex,
            includeTransactions
        });
