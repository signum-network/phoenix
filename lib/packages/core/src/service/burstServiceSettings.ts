/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */


import {Http} from '@burstjs/http';

/**
 * The settings interface for the BurstService class
 */
export interface BurstServiceSettings {
    /**
     * The node/peer host url with protocol and port, e.g. https://testnet.burst.fun:8080
     */
    readonly nodeHost: string;
    /**
     * The relative path the Burst API endpoint, usually '/burst' - must begin with slash
     */
    readonly apiRootUrl: string;
    /**
     * If passed an client instance, it will be used instead of default HttpImpl.
     * Good for testing, but usually you won't need this
     */
    readonly httpClient?: Http;
}
