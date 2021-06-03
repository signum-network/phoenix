/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.getAliasById]]
 * @module core.api.factories
 */
export const getAliasById = (service: ChainService):
    (aliasId: string) => Promise<AliasList> =>
    (aliasId: string): Promise<AliasList> => service.query('getAlias', {
        aliasId,
    });
