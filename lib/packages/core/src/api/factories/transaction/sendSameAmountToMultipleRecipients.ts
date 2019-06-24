/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {Transaction} from '../../../typings/transaction';
import {signAndBroadcastTransaction} from '../../../internal/signAndBroadcastTransaction';


/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendSameAmountToMultipleRecipients]]
 */
export const sendSameAmountToMultipleRecipients = (service: BurstService):
    (transaction: Transaction,
     recipientIds: string[],
     senderPublicKey: string,
     senderPrivateKey: string) => Promise<TransactionId> =>
    async (
        transaction: Transaction,
        recipientIds: string[],
        senderPublicKey: string,
        senderPrivateKey: string,
    ): Promise<TransactionId> => {

        if (recipientIds.length === 0) {
            throw new Error('No recipients given. Send ignored');
        }

        const parameters = {
            publicKey: senderPublicKey,
            recipients: recipientIds.join(';'),
            deadline: transaction.deadline || '1440',
            feeNQT: transaction.feeNQT,
            amountNQT: transaction.amountNQT
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>(
            'sendMoneyMultiSame', parameters);

        return signAndBroadcastTransaction({
            unsignedHexMessage,
            senderPublicKey,
            senderPrivateKey
        }, service);

    };
