/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service';
import {PublishContractArgs} from '../../../typings/args';
import {DefaultDeadline, FeeQuantPlanck, TransactionId, TransactionResponse} from '../../..';
import {signAndBroadcastTransaction} from '../../../internal';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.publishContract]]
 */
export const publishContract = (service: BurstService):
    (args: PublishContractArgs) => Promise<TransactionId> =>
    async (args: PublishContractArgs): Promise<TransactionId> => {

        const parameters = {
            creationBytes: args.codeHex,
            deadline: args.deadline || DefaultDeadline,
            description: args.description,
            feeNQT: args.feePlanck || FeeQuantPlanck,
            minActivationAmountNQT: args.activationAmountPlanck,
            name: args.name,
            publicKey: args.senderPublicKey,
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('createATProgram', parameters);

        return signAndBroadcastTransaction({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        }, service);
    };
