/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.broadcastTransaction]]
 * @module core.api.factories
 */
export const broadcastTransaction = (service: BurstService):
    (signedTransactionPayload: string) => Promise<TransactionId> =>
    (signedTransactionPayload: string): Promise<TransactionId> =>
        service.send('broadcastTransaction', {transactionBytes: signedTransactionPayload});
