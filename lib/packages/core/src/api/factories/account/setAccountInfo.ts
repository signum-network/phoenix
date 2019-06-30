/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {convertNumberToNQTString} from '@burstjs/util';
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {signAndBroadcastTransaction} from '../../../internal';
import {DefaultDeadline} from '../../../constants';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setAccountInfo]]
 */
export const setAccountInfo = (service: BurstService): (
    name: string,
    description: string,
    feeNQT: string,
    senderPublicKey: string,
    senderPrivateKey: string,
    deadline: number,
) => Promise<TransactionId> =>
    async (
        name: string,
        description: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = DefaultDeadline,
    ): Promise<TransactionId> => {

        const parameters = {
            name,
            description,
            deadline: deadline,
            feeNQT: convertNumberToNQTString(parseFloat(feeNQT)),
            publicKey: senderPublicKey
        };
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('setAccountInfo', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service, signFunc);
    };
