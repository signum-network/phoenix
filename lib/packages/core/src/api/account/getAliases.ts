/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import { Alias } from '../../typings/alias';

export interface AliasResponse {
    aliases: Alias[],
    requestProcessingTime: number
}

/**
 * Gets the aliases of an account
 * @param {string} accountId
 * @return {Promise<AliasResponse>}
 */
export const getAliases = (service: BurstService):
    (accountId: string) => Promise<AliasResponse> =>
    (accountId: string): Promise<AliasResponse> => service.query('getAliases', {
        account: accountId,
    });
