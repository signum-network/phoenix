/**
 * Copyright (c) 2021 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {signAndBroadcastTransaction} from '../transaction/signAndBroadcastTransaction';
import {DefaultDeadline} from '../../../constants';
import {SetAccountInfoArgs} from '../../../typings/args/setAccountInfoArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setAccountInfo]]
 * @module core.api.factories
 */
export const setAccountInfo = (service: BurstService):
    (args: SetAccountInfoArgs) => Promise<TransactionId> =>
    async (args: SetAccountInfoArgs): Promise<TransactionId> => {


        const parameters = {
            name: args.name,
            description: args.description,
            deadline: DefaultDeadline,
            feeNQT: args.feePlanck,
            publicKey: args.senderPublicKey
        };
        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('setAccountInfo', parameters);

        return signAndBroadcastTransaction(service)({
            senderPrivateKey: args.senderPrivateKey,
            senderPublicKey: args.senderPublicKey,
            unsignedHexMessage
        });
    };
