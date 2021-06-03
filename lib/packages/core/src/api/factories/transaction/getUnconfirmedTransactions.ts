/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service';
import {UnconfirmedTransactionList} from '../../..';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.getUnconfirmedTransactions]]
 * @module core.api.factories
 */
export const getUnconfirmedTransactions = (service: ChainService):
    () => Promise<UnconfirmedTransactionList> =>
    (): Promise<UnconfirmedTransactionList> =>
        service.query('getUnconfirmedTransactions');
