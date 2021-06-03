/**
 * Copyright (c) 2021 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
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
export const addCommitment = (service: ChainService):
    (args: CommitmentArgs) => Promise<TransactionId> =>
    async (args: CommitmentArgs): Promise<TransactionId> => {
        const parameters = {
            amountNQT: args.amountPlanck,
            publicKey: args.senderPublicKey,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('addCommitment', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });

    };
