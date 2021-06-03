/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {UnconfirmedTransactionList} from '../../../typings/unconfirmedTransactionList';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getUnconfirmedAccountTransactions]]
 * @module core.api.factories
 */
export const getUnconfirmedAccountTransactions = (service: ChainService):
    (
        accountId: string,
        includeIndirect?: boolean
    ) => Promise<UnconfirmedTransactionList> =>
    (
        accountId: string,
        includeIndirect ?: boolean
    ): Promise<UnconfirmedTransactionList> =>
        service.query('getUnconfirmedTransactions', {
                account: accountId,
                includeIndirect
            }
        );
