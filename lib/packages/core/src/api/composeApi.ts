/** @module core */
/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../burstService';
import {Api} from '../typings/api';
import {ApiComposer} from './apiComposer';

import {getBlockByTimestamp} from './factories/block/getBlockByTimestamp';
import {getBlockByHeight} from './factories/block/getBlockByHeight';
import {getBlockById} from './factories/block/getBlockById';
import {getBlockId} from './factories/block/getBlockId';
import {getBlocks} from './factories/block/getBlocks';

import {getBlockchainStatus} from './factories/network/getBlockchainStatus';
import {getServerStatus} from './factories/network/getServerStatus';

import {broadcastTransaction} from './factories/transaction/broadcastTransaction';
import {getTransaction} from './factories/transaction/getTransaction';

import {sendTextMessage} from './factories/message/sendTextMessage';
import {getAccountTransactions} from './factories/account/getAccountTransactions';
import {getUnconfirmedAccountTransactions} from './factories/account/getUnconfirmedAccountTransactions';
import {getAccountBalance} from './factories/account/getAccountBalance';
import {generateSendTransactionQRCode} from './factories/account/generateSendTransactionQRCode';
import {generateSendTransactionQRCodeAddress} from './factories/account/generateSendTransactionQRCodeAddress';
import {suggestFee} from './factories/network/suggestFee';
import {getPeer} from './factories/network/getPeer';
import {getPeers} from './factories/network/getPeers';
import {sendMoney} from './factories/transaction/sendMoney';
import {getAliases} from './factories/account/getAliases';
import {getTime} from './factories/network/getTime';


/**
 * Context for API used in [[composeApi]]
 */
export class ApiSettings {
    constructor(
        public nodeHost: string,
        public apiRootUrl: string,
    ) {
    }
}

/**
 * Composes the API, i.e. setup the environment and mounts the API structure
 * with its functions.
 * @param settings necessary execution context
 * @return The configured BURST API object
 */
export function composeApi(settings: ApiSettings): Api {

    const service = new BurstService(settings.nodeHost, settings.apiRootUrl);

    return ApiComposer
        .create(service)
        .withBlockApi({
            getBlockByTimestamp,
            getBlockByHeight,
            getBlockById,
            getBlockId,
            getBlocks,
        })
        .withNetworkApi({
            getBlockchainStatus,
            getServerStatus,
            suggestFee,
            getPeers,
            getPeer,
            getTime,
        })
        .withTransactionApi({
            broadcastTransaction,
            getTransaction,
            sendMoney,
        })
        .withMessageApi({
            sendTextMessage
        })
        .withAccountApi({
            getAccountTransactions,
            getUnconfirmedAccountTransactions,
            getAccountBalance,
            generateSendTransactionQRCode,
            generateSendTransactionQRCodeAddress,
            getAliases,
        })
        .compose();

}
