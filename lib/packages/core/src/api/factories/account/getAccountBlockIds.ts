/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountBlockIds]]
 */
export const getAccountBlockIds = (service: BurstService):
    (firstIndex?: number, lastIndex?: number) => Promise<string[]> =>
    (firstIndex?: number, lastIndex?: number): Promise<string[]> =>
        service.query('getAccountBlockIds', {
            firstIndex,
            lastIndex
        });
