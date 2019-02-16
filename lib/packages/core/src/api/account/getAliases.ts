/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import {AliasList} from '../../typings/aliasList';

/**
 * Gets the aliases of an account
 * @param {string} accountId
 * @return {Promise<AliasList>}
 */
export const getAliases = (service: BurstService):
    (accountId: string) => Promise<AliasList> =>
    (accountId: string): Promise<AliasList> => service.query('getAliases', {
        account: accountId,
    });
