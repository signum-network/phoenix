/** @module core.api.factories */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsArgs} from '../../../typings/args';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountSubscriptions]]
 */
export const getAccountSubscriptions = (service: BurstService):
    (accountId: string) => Promise<TransactionList> =>
    (accountId: string): Promise<TransactionList> => {

        const parameters = {
            account: accountId,
        };

        return service.query('getAccountSubscriptions', parameters);
    };
