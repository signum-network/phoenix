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
import {TransferAssetArgs} from '../../../typings/args/transferAssetArgs';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.transferAsset]]
 * @module core.api.factories
 *
 */
export const transferAsset = (service: ChainService):
    (args: TransferAssetArgs) => Promise<TransactionId> =>
    async (args: TransferAssetArgs): Promise<TransactionId> => {

        const {senderPrivateKey, senderPublicKey} = args;

        let parameters = {
            asset: args.asset,
            quantityQNT: args.quantity,
            publicKey: args.senderPublicKey,
            recipient: args.recipientId,
            recipientPublicKey: args.recipientPublicKey || undefined,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('transferAsset', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey,
            senderPrivateKey,
            unsignedHexMessage
        });

    };
