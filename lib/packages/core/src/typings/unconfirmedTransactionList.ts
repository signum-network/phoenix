/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Transaction} from './transaction';

export interface UnconfirmedTransactionList {
    readonly requestProcessingTime: number;
    readonly unconfirmedTransactions: Transaction[];
}
