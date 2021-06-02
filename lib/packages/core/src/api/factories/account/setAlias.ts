/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@signumjs/crypto';
import {convertNumberToNQTString} from '@signumjs/util';
import {broadcastTransaction} from '../transaction/broadcastTransaction';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setAlias]]
 *
 * @module core.api.factories
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
        deadline: number,
    ): Promise<TransactionId> => {

        const parameters = {
            aliasName,
            aliasURI,
            deadline: deadline,
            feeNQT: convertNumberToNQTString(parseFloat(feeNQT)),
            publicKey: senderPublicKey
        };
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('setAlias', parameters);
        return signAndBroadcastTransaction(service)({
            senderPrivateKey,
            senderPublicKey,
            unsignedHexMessage
        });


    };
