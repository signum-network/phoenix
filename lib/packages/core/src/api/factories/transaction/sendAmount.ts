/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {Attachment} from '../../../typings/attachment';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment, signAndBroadcastTransaction} from '../../../internal';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendAmount]]
 */
export const sendAmount = (service: BurstService):
    (amountPlanck: string,
     feePlanck: string,
     recipientId: string,
     senderPublicKey: string,
     senderPrivateKey: string,
     attachment?: Attachment,
     deadline?: number) => Promise<TransactionId> =>
    async (
        amountPlanck: string,
        feePlanck: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        attachment: Attachment = null,
        deadline = DefaultDeadline
    ): Promise<TransactionId> => {

        let parameters = {
            amountNQT: amountPlanck,
            publicKey: senderPublicKey,
            recipient: recipientId,
            feeNQT: feePlanck,
            deadline
        };

        if (attachment) {
            parameters = createParametersFromAttachment(attachment, parameters);
        }

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMoney', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service);

    };
