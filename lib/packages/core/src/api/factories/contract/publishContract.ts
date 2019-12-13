/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service';
import {PublishContractArgs} from '../../../typings/args';
import {signAndBroadcastTransaction} from '../../../internal';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline, FeeQuantPlanck} from '../../../constants';
import {generateContract} from '@burstjs/contracts';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.publishContract]]
 */
export const publishContract = (service: BurstService):
    (args: PublishContractArgs) => Promise<TransactionId> =>
    async (args: PublishContractArgs): Promise<TransactionId> => {

        const codeHex = generateContract({
            activationFeePlanck: args.activationAmountPlanck,
            hexCode: args.codeHex
        });

        const parameters = {
            creationBytes: codeHex,
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

        // TODO: return the contract address
    };
