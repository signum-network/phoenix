import {TransactionId} from '../transactionId';
import {Transaction} from '../transaction';

/**
 * Transaction API
 */
export interface TransactionApi {
    broadcastTransaction: (signedTransactionPayload: string) => Promise<TransactionId>;
    getTransaction: (transactionId: string) => Promise<Transaction>;
    sendMoney: (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipientAddress: string
    ) => Promise<TransactionId | Error>;
}
