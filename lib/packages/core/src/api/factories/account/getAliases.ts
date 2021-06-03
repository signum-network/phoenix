/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAliases]]
 * @module core.api.factories
 */
export const getAliases = (service: ChainService):
    (accountId: string) => Promise<AliasList> =>
    (accountId: string): Promise<AliasList> => service.query('getAliases', {
        account: accountId,
    });
