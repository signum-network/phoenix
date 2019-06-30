/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {convertNumberToNQTString} from '@burstjs/util';
import {signAndBroadcastTransaction} from '../../../internal';
import {DefaultDeadline} from '../../../constants';

/**
 * Use with [[ApiComposer]] and belongs to [[MessageApi]].
 *
 * See details at [[MessageApi.sendTextMessage]]
 */
export const sendTextMessage = (service: BurstService):
    (message: string,
     recipientId: string,
     senderPublicKey: string,
     senderPrivateKey: string,
     deadline?: number,
     fee?: number,
     signFunc?: (unsignedBytes: string) => string,
    ) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = DefaultDeadline,
        fee: number,
        signFunc: (unsignedBytes: string) => string = null,
    ): Promise<TransactionId> => {

        const parameters = {
            recipient: recipientId,
            publicKey: senderPublicKey,
            message: message,
            messageIsText: true,
            deadline: deadline,
            feeNQT: convertNumberToNQTString(fee),
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service, signFunc);
    };
