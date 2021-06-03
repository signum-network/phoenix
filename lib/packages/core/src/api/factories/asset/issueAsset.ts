/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {IssueAssetArgs} from '../../../typings/args';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.issueAsset]]
 * @module core.api.factories
 *
 */
export const issueAsset = (service: ChainService):
    (args: IssueAssetArgs) => Promise<TransactionId> =>
    async (args: IssueAssetArgs): Promise<TransactionId> => {

        const {senderPrivateKey, senderPublicKey} = args;

        let parameters = {
            name: args.name,
            description: args.description,
            quantityQNT: args.quantity,
            decimals: args.decimals,
            publicKey: senderPublicKey,
            feeNQT: args.amountPlanck,
            deadline: args.deadline || DefaultDeadline,
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('issueAsset', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        });

    };
