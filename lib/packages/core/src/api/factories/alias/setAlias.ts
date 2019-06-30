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
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.setAlias]]
 */
export const setAlias = (service: BurstService): (
    aliasName: string,
    aliasURI: string,
    feeNQT: string,
    senderPublicKey: string,
    senderPrivateKey: string,
    deadline: number,
    signFunc?: (unsignedBytes: string) => Promise<string>,
) => Promise<TransactionId> =>
    async (
        aliasName: string,
        aliasURI: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number = DefaultDeadline,
        signFunc: (unsignedBytes: string) => Promise<string> = null,
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
