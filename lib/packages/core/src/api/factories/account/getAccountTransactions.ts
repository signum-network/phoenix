/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../burstService';
import {TransactionList} from '../../../typings/transactionList';

export const getAccountTransactions = (service: BurstService):
    (
        accountId: string,
        firstIndex?: number,
        lastIndex?: number,
        numberOfConfirmations?: number,
        type?: number,
        subtype?: number,
        includeIndirect?: boolean
    ) => Promise<TransactionList> =>
    (
        accountId: string,
        firstIndex?: number,
        lastIndex?: number,
        numberOfConfirmations?: number,
        type?: number,
        subtype?: number,
        includeIndirect: boolean = true
    ): Promise<TransactionList> =>
        service.query('getAccountTransactions', {
            account: accountId,
            firstIndex,
            lastIndex,
            numberOfConfirmations,
            type,
            subtype,
            includeIndirect
        });
