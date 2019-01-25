import {BurstService} from '../burstService';

import {getBlockByTimestamp} from './block/getBlockByTimestamp';
import {getBlockByHeight} from './block/getBlockByHeight';
import {getBlockById} from './block/getBlockById';
import {getBlockId} from './block/getBlockId';

import {getBlockchainStatus} from './network/getBlockchainStatus';
import {getServerStatus} from './network/getServerStatus';

import {broadcastTransaction} from './transaction/broadcastTransaction';
import {getTransaction} from './transaction/getTransaction';

import {sendTextMessage} from './message/sendTextMessage';

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
 * @param settings Injects necessary execution context
 * @return The configured BURST API object
 */
export function compose(settings: ApiSettings) {

    const service = new BurstService(settings.nodeHost, settings.apiRootUrl);

    return {
        block: {
            getBlockByTimestamp: getBlockByTimestamp(service),
            getBlockByHeight: getBlockByHeight(service),
            getBlockById: getBlockById(service),
            getBlockId: getBlockId(service),
        },
        network: {
            getBlockchainStatus: getBlockchainStatus(service),
            getServerStatus: getServerStatus(service),
        },
        transaction: {
            // TODO: review, if we really want to expose this method
            broadcastTransaction: broadcastTransaction(service),
            getTransaction: getTransaction(service),
        },
        message: {
            sendTextMessage: sendTextMessage(service),
        }
    };
}
