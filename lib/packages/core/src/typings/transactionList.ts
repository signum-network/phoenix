/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Transaction} from './transaction';

export interface TransactionList {
    readonly requestProcessingTime: number;
    readonly transactions: Transaction[];
}
