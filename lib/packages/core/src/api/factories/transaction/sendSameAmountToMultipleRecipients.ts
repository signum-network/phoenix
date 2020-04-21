/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {signAndBroadcastTransaction} from '../../../internal/signAndBroadcastTransaction';
import {DefaultDeadline} from '../../../constants';


/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendSameAmountToMultipleRecipients]]
 * @module core.api.factories
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
        deadline = DefaultDeadline
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
