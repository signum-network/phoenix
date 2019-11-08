/** @module core.api */
/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../service';
import {BurstServiceSettings} from '../service/burstServiceSettings';
import {Api} from '../typings/api';
import {ApiVersion} from '../constants/apiVersion';
import {ApiComposer} from './apiComposer';
import {getBlockByHeight, getBlockById, getBlockByTimestamp, getBlockId, getBlocks} from './factories/block';
import {getBlockchainStatus, getPeer, getPeers, getServerStatus, getTime, suggestFee} from './factories/network';
import {sendEncryptedTextMessage, sendTextMessage} from './factories/message';
import {
    generateSendTransactionQRCode,
    generateSendTransactionQRCodeAddress,
    getAccount,
    getAccountBalance,
    getAccountBlockIds,
    getAccountBlocks,
    getAccountTransactions,
    getAliases,
    getUnconfirmedAccountTransactions,
    setAccountInfo,
    setAlias,
    setRewardRecipient
} from './factories/account';
import {getAliasById, getAliasByName} from './factories/alias';
import {getAllContractIds, getContract, getContractsByAccount} from './factories/contract';
import {
    broadcastTransaction,
    getTransaction,
    sendAmount,
    sendAmountToMultipleRecipients,
    sendAmountToSingleRecipient,
    sendSameAmountToMultipleRecipients
} from './factories/transaction';
import {getAllAssets, getAsset} from './factories/asset';
import {DefaultApiEndpoint} from '../constants';
import {AxiosRequestConfig} from 'axios';


/**
 * Settings for API used in [[composeApi]]
 */
export class ApiSettings {
    /**
     * @param nodeHost {string} The url of the Burst peer
     * @param apiRootUrl {string} The optional api endpoint, i.e. `/burst`. Usually, you wont use this.
     * @param apiVersion {ApiVersion} For future usage.
     * @param httpOptions {any | AxiosRequestSettings}   Optional http options, like additional header.
     * The default implementation uses axios. In case of a custom client pass your own options.
     * see [Axios Configuration](https://github.com/axios/axios#request-config)

     */
    constructor(
        public nodeHost: string,
        public apiRootUrl: string = DefaultApiEndpoint,
        public apiVersion: ApiVersion = ApiVersion.V1,
        public httpOptions?: any | AxiosRequestConfig,
    ) {
    }
}

/**
 * Composes the API, i.e. setup the environment and mounts the API structure
 * with its functions.
 *
 * ```ts
 * const api = composeApi({
 *   nodeHost: 'https://wallet1.burst-team.us:2083', // one of the mainnet nodes
 * })
 * ```
 *
 * > Note, that this method mounts the __entire__ API, i.e. all available methods. One may also customize the API composition
 * using [[ApiComposer]].
 *
 * @param settings necessary execution context
 * @return The _complete_ API
 */
export function composeApi(settings: ApiSettings): Api {

    const serviceSettings: BurstServiceSettings = {...settings};
    const service = new BurstService(serviceSettings);

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
            sendAmount,
            sendAmountToSingleRecipient,
            sendAmountToMultipleRecipients,
            sendSameAmountToMultipleRecipients,
        })
        .withMessageApi({
            sendTextMessage,
            sendEncryptedTextMessage,
        })
        .withAccountApi({
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
        }).withAliasApi({
            getAliasByName,
            getAliasById,
            setAlias
        }).withContractApi({
            getContract,
            getContractsByAccount,
            getAllContractIds
        }).withAssetApi({
            getAsset,
            getAllAssets,
        })
        .compose();
}
