/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {generateSignature} from '@burstjs/crypto';
import {verifySignature} from '@burstjs/crypto';
import {generateSignedTransactionBytes} from '@burstjs/crypto';
import {convertNumberToNQTString} from '@burstjs/util';
import {broadcastTransaction} from '../transaction/broadcastTransaction';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.setAlias]]
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
        const {unsignedTransactionBytes} = await service.send<TransactionResponse>('setAlias', parameters);
        const signature = generateSignature(unsignedTransactionBytes, senderPrivateKey);
        if (!verifySignature(signature, unsignedTransactionBytes, senderPublicKey)) {
            throw new Error('The signed message could not be verified! Transaction not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedTransactionBytes, signature);
        return broadcastTransaction(service)(signedMessage);

    };
