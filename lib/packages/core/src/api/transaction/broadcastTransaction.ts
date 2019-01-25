import {BurstService} from '../../burstService';
import {TransactionId} from '../../typings/transactionId';


/**
 * Broadcasts a transaction to the network/blockchain
 *
 * @param signedTransactionPayload The _signed_ transaction payload encoded in base64
 * @return The Transaction Id
 */
export const broadcastTransaction = (service: BurstService):
    (signedTransactionPayload: string) => Promise<TransactionId> =>
    (signedTransactionPayload: string): Promise<TransactionId> =>
        service.send('broadcastTransaction', {transactionBytes: signedTransactionPayload});
