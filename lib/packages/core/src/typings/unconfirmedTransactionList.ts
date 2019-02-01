/**
 * Transaction Type
 */
import {Transaction} from './transaction';

export interface UnconfirmedTransactionList {
    readonly requestProcessingTime: number;
    readonly unconfirmedTransactions: Transaction[];
}
