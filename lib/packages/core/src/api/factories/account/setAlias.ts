/** @module core.api.factories */

// TODO is this file not a duplicate of ../alias/setAlias.ts ?

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
 * See details at [[AccountApi.setAlias]]
 */
export const setAlias = (service: BurstService): (
        aliasName: string,
        aliasURI: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number,
    ) => Promise<TransactionId> =>
    async (
        aliasName: string,
        aliasURI: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = DefaultDeadline,
    ): Promise<TransactionId> => {

        const parameters = {
            aliasName: aliasName,
            aliasURI: aliasURI,
            deadline: deadline,
            feeNQT: convertNumberToNQTString(parseFloat(feeNQT)),
            publicKey: senderPublicKey
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('setAlias', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        }, service, signFunc);
    };
