/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { TransactionId } from '../../../typings/transactionId';
import { TransactionResponse } from '../../../typings/transactionResponse';
import { Transaction } from '../../../typings/transaction';
import { convertNumberToNQTString } from '@burstjs/util';
import {signAndBroadcastTransaction} from '../../../internal';
import {DefaultDeadline} from '../../../constants';

/**
 * <div class="deprecated">
 *     Use [[sendSameAmountToMultipleRecipients]], [[sendAmountToMultipleRecipients]] instead
 * </div>
 *
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendMoneyMultiOut]]
 */
export const sendMoneyMultiOut = (service: BurstService):
    (transaction: Transaction,
     senderPublicKey: string,
     senderPrivateKey: string,
     recipients: string,
     sameAmount: boolean,
     signFunc?: (unsignedBytes: string) => Promise<string>,
    ) => Promise<TransactionId | Error> =>
    async (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipients: string,
        sameAmount: boolean,
        signFunc: (unsignedBytes: string) => Promise<string> = null,
    ): Promise<TransactionId | Error> => {

        const parameters = {
            publicKey: senderPublicKey,
            recipients: recipients,
            deadline: transaction.deadline || DefaultDeadline,
            feeNQT: convertNumberToNQTString(parseFloat(transaction.feeNQT)),
            amountNQT: sameAmount ? convertNumberToNQTString(parseFloat(transaction.amountNQT)) : undefined
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>(
            sameAmount ? 'sendMoneyMultiSame' : 'sendMoneyMulti', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service, signFunc);
    };
