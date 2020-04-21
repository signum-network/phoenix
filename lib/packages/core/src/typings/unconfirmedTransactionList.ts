
/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Transaction} from './transaction';

/**
 * Unconfirmed Transaction List
 * @module core
 * */
export interface UnconfirmedTransactionList {
    readonly requestProcessingTime: number;
    readonly unconfirmedTransactions: Transaction[];
}
