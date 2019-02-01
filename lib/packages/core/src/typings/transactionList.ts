/**
 * Transaction Type
 */
import {Transaction} from './transaction';

export interface TransactionList {
    readonly requestProcessingTime: number;
    readonly transactions: Transaction[];
}
