/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {MultioutRecipientAmount} from '../../../typings/multioutRecipientAmount';
import {signAndBroadcastTransaction} from './signAndBroadcastTransaction';
import {DefaultDeadline} from '../../../constants';

function mountRecipientsString(recipientAmounts: MultioutRecipientAmount[]): string {
    return recipientAmounts.map( ({amountNQT, recipient}) => `${recipient}:${amountNQT}`).join(';');
}

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendAmountToMultipleRecipients]]
 * @module core.api.factories
 */
export const sendAmountToMultipleRecipients = (service: BurstService):
    (
        recipientAmounts: MultioutRecipientAmount[],
        feePlanck: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline?: number
    ) => Promise<TransactionId> =>
    async (
        recipientAmounts: MultioutRecipientAmount[],
        feePlanck: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline = DefaultDeadline
    ): Promise<TransactionId> => {

        if (recipientAmounts.length === 0) {
            throw new Error('No recipients given. Send ignored');
        }

        const parameters = {
            publicKey: senderPublicKey,
            recipients: mountRecipientsString(recipientAmounts),
            feeNQT: feePlanck,
            deadline
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>(
            'sendMoneyMulti', parameters);

        return signAndBroadcastTransaction(service)({
            unsignedHexMessage,
            senderPublicKey,
            senderPrivateKey
        });

    };
