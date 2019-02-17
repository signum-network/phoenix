/** @module core */
/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../burstService';
import {Api} from '../typings/api';
import {ApiComposer} from './apiComposer';

import {getBlockByTimestamp} from './block/getBlockByTimestamp';
import {getBlockByHeight} from './block/getBlockByHeight';
import {getBlockById} from './block/getBlockById';
import {getBlockId} from './block/getBlockId';

import {getBlockchainStatus} from './network/getBlockchainStatus';
import {getServerStatus} from './network/getServerStatus';

import {broadcastTransaction} from './transaction/broadcastTransaction';
import {getTransaction} from './transaction/getTransaction';

import {sendTextMessage} from './message/sendTextMessage';
import {getAccountTransactions} from './account/getAccountTransactions';
import {getUnconfirmedAccountTransactions} from './account/getUnconfirmedAccountTransactions';
import {getAccountBalance} from './account/getAccountBalance';
import {generateSendTransactionQRCode} from './account/generateSendTransactionQRCode';
import {generateSendTransactionQRCodeAddress} from './account/generateSendTransactionQRCodeAddress';
import {suggestFee} from './network/suggestFee';
import {sendMoney} from './transaction/sendMoney';
import {getAliases} from './account/getAliases';


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
        })
        .withNetworkApi({
            getBlockchainStatus,
            getServerStatus,
            suggestFee,
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
