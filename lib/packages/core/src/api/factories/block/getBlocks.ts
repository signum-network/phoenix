/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Block} from '../../../typings/block';

/**
 * Use with [[ApiComposer]] and belongs to [[BlockApi]].
 *
 * See details at [[BlockApi.getBlocks]]
 *
 * @module core.api.factories
 */
export const getBlocks = (service: ChainService):
    (firstIndex?: number, lastIndex?: number, includeTransactions?: boolean) => Promise<Block[]> =>
    (firstIndex?: number, lastIndex?: number, includeTransactions?: boolean): Promise<Block[]> =>
        service.query('getBlocks', {
            firstIndex,
            lastIndex,
            includeTransactions
        });
