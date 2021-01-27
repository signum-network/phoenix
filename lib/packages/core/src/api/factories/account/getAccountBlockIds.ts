/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {BlockIdList} from '../../../typings/blockIdList';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountBlockIds]]
 * @module core.api.factories
 */
export const getAccountBlockIds = (service: BurstService):
    (firstIndex?: number, lastIndex?: number) => Promise<BlockIdList> =>
    (firstIndex?: number, lastIndex?: number): Promise<BlockIdList> =>
        service.query('getAccountBlockIds', {
            firstIndex,
            lastIndex
        });
