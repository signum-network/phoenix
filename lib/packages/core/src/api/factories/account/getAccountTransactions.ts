/** @module core.api.factories */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionList} from '../../../typings/transactionList';
import {BrsVersion} from '../../../constants/brsVersion';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountTransactions]]
 */
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
        includeIndirect?: boolean
    ): Promise<TransactionList> =>
        service.query('getAccountTransactions', {
            account: accountId,
            firstIndex,
            lastIndex,
            numberOfConfirmations,
            type,
            subtype,
            includeIndirect: service.settings.brsVersion === BrsVersion.BEFORE_V2_3 ? undefined : includeIndirect
        });
