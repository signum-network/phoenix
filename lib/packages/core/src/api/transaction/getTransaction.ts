import {BurstService} from '../../burstService';
import {BlockId, Transaction} from '../..';
import {TransactionId} from '../../typings/transactionId';

/**
 * Get a transaction from the network/blockchain
 *
 * @param transactionId The transaction Id
 * @return The Transaction
 */
export const getTransaction = (service: BurstService):
    (transactionId: string) => Promise<Transaction> =>
    (transactionId: string): Promise<Transaction> =>
        service.query('getTransaction', {transaction: transactionId});
