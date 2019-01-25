import {BurstService} from '../burstService';

import {getBlockByTimestamp} from './block/getBlockByTimestamp';
import {getBlockByHeight} from './block/getBlockByHeight';
import {getBlockById} from './block/getBlockById';
import {getBlockId} from './block/getBlockId';

import {getBlockchainStatus} from './network/getBlockchainStatus';
import {getServerStatus} from './network/getServerStatus';
import {broadcastTransaction} from './transaction/broadcastTransaction';

export class ApiSettings {
    constructor(
        public host: string,
        public apiRootUrl: string,
    ) {
    }
}

/**
 * Composes the API
 * @param settings Injects necessary execution context
 */
export function compose(settings: ApiSettings) {

    const service = new BurstService(settings.host, settings.apiRootUrl);

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
        }
    };
}
