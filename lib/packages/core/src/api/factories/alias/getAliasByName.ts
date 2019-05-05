/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.getAliasByName]]
 */
export const getAliasByName = (service: BurstService):
    (aliasName: string) => Promise<AliasList> =>
    (aliasName: string): Promise<AliasList> => service.query('getAlias', {
        aliasName
    });
