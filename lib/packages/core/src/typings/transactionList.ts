
/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Transaction} from './transaction';

/**
 * Transaction List
 *
 * @module core
 * */
export interface TransactionList {
    readonly requestProcessingTime: number;
    readonly transactions: Transaction[];
}
