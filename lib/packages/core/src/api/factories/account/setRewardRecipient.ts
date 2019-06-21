/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { TransactionId } from '../../../typings/transactionId';
import { TransactionResponse } from '../../../typings/transactionResponse';
import { generateSignature } from '@burstjs/crypto';
import { verifySignature } from '@burstjs/crypto';
import { generateSignedTransactionBytes } from '@burstjs/crypto';
import { convertNumberToNQTString } from '@burstjs/util';
import { broadcastTransaction } from '../transaction/broadcastTransaction';

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
    ) => Promise<TransactionId> =>
    async (
        recipient: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline: number,
    ): Promise<TransactionId> => {

        const parameters = {
            recipient,
            deadline: 1440,
            feeNQT: convertNumberToNQTString(parseFloat(feeNQT)),
            publicKey: senderPublicKey
        };
        const { unsignedTransactionBytes: unsignedHexMessage } = await service.send<TransactionResponse>('setRewardRecipient', parameters);
        const signature = generateSignature(unsignedHexMessage, senderPrivateKey);
        if (!verifySignature(signature, unsignedHexMessage, senderPublicKey)) {
            throw new Error('The signed message could not be verified! Transaction not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(service)(signedMessage);

    };
