/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { TransactionId } from '../../../typings/transactionId';
import { TransactionResponse } from '../../../typings/transactionResponse';
import { generateSignature, decryptAES, Keys } from '@burstjs/crypto';
import { verifySignature } from '@burstjs/crypto';
import { generateSignedTransactionBytes } from '@burstjs/crypto';
import { constructAttachment } from '../../../internal/constructAttachment';
import {broadcastTransaction} from './broadcastTransaction';
import {DefaultDeadline} from '../../../constants';
import {Attachment} from '../../..';
import {signAndBroadcastTransaction} from '../../../internal';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendMoney]]
 */
export const sendMoney = (service: BurstService):
    (amountPlanck: string,
     feePlanck: string,
     recipientId: string,
     senderPublicKey: string,
     senderPrivateKey: string,
     attachment: Attachment,
     deadline?: number) => Promise<TransactionId | Error> =>
    async (
        amountPlanck: string,
        feePlanck: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        attachment: Attachment,
        deadline = DefaultDeadline
    ): Promise<TransactionId | Error> => {

        let parameters = {
            amountNQT: amountPlanck,
            publicKey: senderPublicKey,
            recipient: recipientId,
            feeNQT: feePlanck,
            deadline
        };

        if (attachment) {
            parameters = constructAttachment(transaction, parameters);
        }
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMoney', parameters);

        return signAndBroadcastTransaction(unsignedHexMessage, service)

    };
