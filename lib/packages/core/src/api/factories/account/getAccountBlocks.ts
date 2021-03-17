/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import {BlockList} from '../../../typings/blockList';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountBlocks]]
 * @module core.api.factories
 */
export const getAccountBlocks = (service: BurstService):
    (firstIndex?: number, lastIndex?: number) => Promise<BlockList> =>
    (firstIndex?: number, lastIndex?: number): Promise<BlockList> =>
        service.query('getAccountBlocks', {
            firstIndex,
            lastIndex
        });
