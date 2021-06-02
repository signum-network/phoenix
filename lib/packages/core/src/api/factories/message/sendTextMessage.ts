/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {convertNumberToNQTString} from '@signumjs/util';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[MessageApi]].
 *
 * See details at [[MessageApi.sendTextMessage]]
 * @deprecated
 * <div class="deprecated">
 *     Use [[MessageApi.sendMessage]] instead
 * </div>
 * @module core.api.factories
 */
export const sendTextMessage = (service: BurstService):
    (message: string,
     recipientId: string,
     senderPublicKey: string,
     senderPrivateKey: string,
     deadline?: number,
     fee?: number) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = DefaultDeadline,
        fee: number = 0.1,
    ): Promise<TransactionId> => {

        const parameters = {
            recipient: recipientId,
            publicKey: senderPublicKey,
            message,
            messageIsText: true,
            broadcast: true,
            deadline,
            feeNQT: convertNumberToNQTString(fee),
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMessage', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: senderPublicKey,
            senderPrivateKey: senderPrivateKey,
            unsignedHexMessage
        });
    };
