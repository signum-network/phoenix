/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {convertNumberToNQTString} from '@burstjs/util';
import {generateSignature, verifySignature, generateSignedTransactionBytes} from '@burstjs/crypto';
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {broadcastTransaction} from '../transaction/broadcastTransaction';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setAccountInfo]]
 * @module core.api.factories
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
        deadline: number,
    ): Promise<TransactionId> => {

        const parameters = {
            name,
            description,
            deadline: 1440,
            feeNQT: convertNumberToNQTString(parseFloat(feeNQT)),
            publicKey: senderPublicKey
        };
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('setAccountInfo', parameters);

        return signAndBroadcastTransaction(service)({
            senderPrivateKey,
            senderPublicKey,
            unsignedHexMessage
        });
    };
