/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {convertNumberToNQTString} from '@burstjs/util';
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {Transaction} from '../../../typings/transaction';
import {constructAttachment} from '../../../internal/constructAttachment';
import {signAndBroadcastTransaction} from '../../../internal';
import {DefaultDeadline} from '../../../constants';

/**
 * <div class="deprecated">
 *     Use [[TransactionApi.sendAmount]] instead
 * </div>
 *
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendMoney]]
 *
 */
export const sendMoney = (service: BurstService):
    (transaction: Transaction,
     senderPublicKey: string,
     senderPrivateKey: string,
     recipientAddress: string,
     signFunc?: (unsignedBytes: string) => string,
    ) => Promise<TransactionId | Error> =>
    async (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipientAddress: string,
        signFunc: (unsignedBytes: string) => string = null,
    ): Promise<TransactionId | Error> => {

        let parameters = {
            amountNQT: convertNumberToNQTString(parseFloat(transaction.amountNQT)),
            publicKey: senderPublicKey,
            recipient: recipientAddress,
            deadline: transaction.deadline || DefaultDeadline,
            feeNQT: convertNumberToNQTString(parseFloat(transaction.feeNQT)),
        };
        if (transaction.attachment) {
            parameters = constructAttachment(transaction, parameters);
        }
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMoney', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service, signFunc);
    };
