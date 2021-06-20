/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {BlockList} from '../../../typings/blockList';

/**
 * Use with [[ApiComposer]] and belongs to [[BlockApi]].
 *
 * See details at [[BlockApi.getBlocks]]
 *
 * @module core.api.factories
 */
export const getBlocks = (service: ChainService):
    (firstIndex?: number, lastIndex?: number, includeTransactions?: boolean) => Promise<BlockList> =>
    (firstIndex?: number, lastIndex?: number, includeTransactions?: boolean): Promise<BlockList> =>
        service.query('getBlocks', {
            firstIndex,
            lastIndex,
            includeTransactions
        });
