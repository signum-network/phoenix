/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsArgs} from '../../../typings/args';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountTransactions]]
 * @module core.api.factories
 */
export const getAccountTransactions = (service: ChainService):
    (args: GetAccountTransactionsArgs) => Promise<TransactionList> =>
    (args: GetAccountTransactionsArgs): Promise<TransactionList> => {

        const parameters = {
            ...args,
            account: args.accountId,
        };
        delete parameters.accountId;

        return service.query('getAccountTransactions', parameters);
    };
