/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { TransactionId } from '../../../typings/transactionId';
import { TransactionResponse } from '../../../typings/transactionResponse';
import { convertNumberToNQTString } from '@burstjs/util';
import {signAndBroadcastTransaction} from '../../../internal';
import {DefaultDeadline} from '../../../constants';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setRewardRecipient]]
 */
export const setRewardRecipient = (service: BurstService): (
        recipient: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number,
        signFunc?: (unsignedBytes: string) => Promise<string>,
    ) => Promise<TransactionId> =>
    async (
        recipient: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = DefaultDeadline,
        signFunc: (unsignedBytes: string) => Promise<string> = null,
    ): Promise<TransactionId> => {

        const parameters = {
            recipient: recipient,
            deadline: deadline,
            feeNQT: convertNumberToNQTString(parseFloat(feeNQT)),
            publicKey: senderPublicKey
        };
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('setRewardRecipient', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service, signFunc);
    };
