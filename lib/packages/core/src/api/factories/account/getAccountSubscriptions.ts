/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsArgs} from '../../../typings/args';
import {SubscriptionList} from '../../../typings/subscriptionList';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountSubscriptions]]
 * @module core.api.factories
 */
export const getAccountSubscriptions = (service: BurstService):
    (accountId: string) => Promise<SubscriptionList> =>
    (accountId: string): Promise<SubscriptionList> => {

        const parameters = {
            account: accountId,
        };

        return service.query('getAccountSubscriptions', parameters);
    };
