/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.getAliasByName]]
 * @module core.api.factories
 */
export const getAliasByName = (service: ChainService):
    (aliasName: string) => Promise<AliasList> =>
    (aliasName: string): Promise<AliasList> => service.query('getAlias', {
        aliasName
    });
