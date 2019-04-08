/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAliases]]
 */
export const getAliases = (service: BurstService):
    (accountId: string) => Promise<AliasList> =>
    (accountId: string): Promise<AliasList> => service.query('getAliases', {
        account: accountId,
    });
