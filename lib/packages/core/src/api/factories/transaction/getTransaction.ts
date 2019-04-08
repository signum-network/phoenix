/** @module core.api.factories */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {BlockId, Transaction} from '../../..';
import {TransactionId} from '../../../typings/transactionId';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.broadcastTransaction]]
 */
export const getTransaction = (service: BurstService):
    (transactionId: string) => Promise<Transaction> =>
    (transactionId: string): Promise<Transaction> =>
        service.query('getTransaction', {transaction: transactionId});
