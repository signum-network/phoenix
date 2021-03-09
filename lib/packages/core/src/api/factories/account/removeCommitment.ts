/**
 * Copyright (c) 2021 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {signAndBroadcastTransaction} from '../transaction';
import {CommitmentArgs} from '../../../typings/args/commitmentArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.addCommitment]]
 * @module core.api.factories
 */
export const removeCommitment = (service: BurstService):
    (args: CommitmentArgs) => Promise<TransactionId> =>
    async (args: CommitmentArgs): Promise<TransactionId> => {
        const parameters = {
            amountNQT: args.amountPlanck,
            publicKey: args.senderPublicKey,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('removeCommitment', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });

    };
