/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {signAndBroadcastTransaction} from '../../../internal/signAndBroadcastTransaction';


/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendSameAmountToMultipleRecipients]]
 */
export const sendSameAmountToMultipleRecipients = (service: BurstService):
    (amountPlanck: string,
     feePlanck: string,
     recipientIds: string[],
     senderPublicKey: string,
     senderPrivateKey: string,
     deadline?: number
    ) => Promise<TransactionId> =>
    async (
        amountPlanck: string,
        feePlanck: string,
        recipientIds: string[],
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline = 1440
    ): Promise<TransactionId> => {

        if (recipientIds.length === 0) {
            throw new Error('No recipients given. Send ignored');
        }

        const parameters = {
            publicKey: senderPublicKey,
            recipients: recipientIds.join(';'),
            feeNQT: feePlanck,
            amountNQT: amountPlanck,
            deadline,
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>(
            'sendMoneyMultiSame', parameters);

        return signAndBroadcastTransaction({
            unsignedHexMessage,
            senderPublicKey,
            senderPrivateKey
        }, service);

    };
