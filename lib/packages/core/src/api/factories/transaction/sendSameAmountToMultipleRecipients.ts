/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {signAndBroadcastTransaction} from './signAndBroadcastTransaction';
import {DefaultDeadline} from '../../../constants';


/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendSameAmountToMultipleRecipients]]
 * @module core.api.factories
 */
export const sendSameAmountToMultipleRecipients = (service: ChainService):
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

        return signAndBroadcastTransaction(service)({
            unsignedHexMessage,
            senderPublicKey,
            senderPrivateKey
        });

    };
