/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.getAliasById]]
 * @module core.api.factories
 */
export const getAliasById = (service: BurstService):
    (aliasId: string) => Promise<AliasList> =>
    (aliasId: string): Promise<AliasList> => service.query('getAlias', {
        aliasId,
    });
