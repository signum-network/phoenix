/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../service';
import {ChainServiceSettings} from '../service';
import {Api} from '../typings/api';
import {ApiVersion} from '../constants/apiVersion';
import {ApiComposer} from './apiComposer';
import {
    getBlockByHeight,
    getBlockById,
    getBlockByTimestamp,
    getBlockId,
    getBlocks
} from './factories/block';
import {
    getBlockchainStatus,
    getPeer,
    getPeers,
    getServerStatus,
    getTime,
    getSuggestedFees,
} from './factories/network';
import {
    sendEncryptedMessage,
    sendMessage,
} from './factories/message';
import {
    generateSendTransactionQRCode,
    generateSendTransactionQRCodeAddress,
    getAccount,
    getAccountBalance,
    getAccountBlockIds,
    getAccountBlocks,
    getAccountSubscriptions,
    getAccountTransactions,
    getAliases,
    getSubscriptionsToAccount,
    getUnconfirmedAccountTransactions,
    setAccountInfo,
    setAlias,
    setRewardRecipient,
    getRewardRecipient, addCommitment, removeCommitment,
} from './factories/account';
import {getAliasById, getAliasByName} from './factories/alias';
import {
    callContractMethod,
    getAllContractIds,
    getContract,
    getContractsByAccount,
    publishContract
} from './factories/contract';
import {
    broadcastTransaction,
    cancelSubscription,
    createSubscription,
    getTransaction,
    sendAmountToMultipleRecipients,
    sendAmountToSingleRecipient,
    sendSameAmountToMultipleRecipients,
    getSubscription,
    getUnconfirmedTransactions,
    signAndBroadcastTransaction
} from './factories/transaction';
import {
    cancelAskOrder,
    cancelBidOrder,
    getAllAssets,
    getAsset,
    issueAsset,
    placeAskOrder,
    placeBidOrder,
    transferAsset,
} from './factories/asset';
import {AxiosRequestConfig} from 'axios';

/**
 * Settings for API used in [[composeApi]]
 *
 * @module core.api
 * */
export class ApiSettings {
    /**
     * @param nodeHost {string} The url of the peer/node
     * @param apiVersion {ApiVersion} For future usage.
     * @param reliableNodeHosts A list of node/peer hosts that can be chosen of, usually a list of reliable/trusted nodes. This is necessary for the automatic
     * node selection.
     * @param httpClientOptions {any | AxiosRequestSettings}   Optional http options, like additional header.
     * The default implementation uses axios. In case of a custom client pass your own options.
     * see [Axios Configuration](https://github.com/axios/axios#request-config)
     */
    constructor(
        public nodeHost: string,
        public apiVersion: ApiVersion = ApiVersion.V1,
        public reliableNodeHosts?: string[],
        public httpClientOptions?: any | AxiosRequestConfig,
    ) {
    }
}

/**
 * Composes the API, i.e. setup the environment and mounts the API structure
 * with its functions.
 *
 * ```ts
 * const api = composeApi(new ApiSettings('https://europe.signum.network')), // one of the mainnet nodes
 * ```
 *
 * > Note, that this method mounts the __entire__ API, i.e. all available methods. One may also customize the API composition
 * using [[ApiComposer]].
 *
 * @param settings necessary execution context
 * @return The _complete_ API
 *
 * @module core.api
 */
export function composeApi(settings: ApiSettings): Api {

    const serviceSettings: ChainServiceSettings = {...settings};
    const service = new ChainService(serviceSettings);

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
            getSuggestedFees,
            getPeers,
            getPeer,
            getTime,
        })
        .withTransactionApi({
            broadcastTransaction,
            getTransaction,
            sendAmountToSingleRecipient,
            sendAmountToMultipleRecipients,
            sendSameAmountToMultipleRecipients,
            createSubscription,
            cancelSubscription,
            getSubscription,
            getUnconfirmedTransactions,
            signAndBroadcastTransaction,
        })
        .withMessageApi({
            sendMessage,
            sendEncryptedMessage,
        })
        .withAccountApi({
            addCommitment,
            removeCommitment,
            getAccountTransactions,
            getUnconfirmedAccountTransactions,
            getAccountBalance,
            generateSendTransactionQRCode,
            generateSendTransactionQRCodeAddress,
            getAliases,
            setAlias,
            getAccount,
            getAccountBlocks,
            getAccountBlockIds,
            setAccountInfo,
            setRewardRecipient,
            getAccountSubscriptions,
            getSubscriptionsToAccount,
            getRewardRecipient,
        }).withAliasApi({
            getAliasByName,
            getAliasById,
            setAlias
        }).withContractApi({
            getContract,
            getContractsByAccount,
            getAllContractIds,
            publishContract,
            callContractMethod,
        }).withAssetApi({
            getAsset,
            getAllAssets,
            issueAsset,
            transferAsset,
            placeAskOrder,
            placeBidOrder,
            cancelAskOrder,
            cancelBidOrder,
        })
        .compose();
}
