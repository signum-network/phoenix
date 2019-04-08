/** @module core.api.factories */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {UnconfirmedTransactionList} from '../../../typings/unconfirmedTransactionList';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getUnconfirmedAccountTransactions]]
 */
export const getUnconfirmedAccountTransactions = (service: BurstService):
    (accountId: string) => Promise<UnconfirmedTransactionList> =>
    (accountId: string): Promise<UnconfirmedTransactionList> =>
        service.query('getUnconfirmedTransactions', {account: accountId});
