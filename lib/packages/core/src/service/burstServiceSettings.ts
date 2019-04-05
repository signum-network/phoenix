import {Http} from '@burstjs/http';

export interface BurstServiceSettings {
    /**
     * The node/peer host url with protocol and port, e.g. https://testnet.burst.fun:8080
     */
    readonly baseUrl: string;
    /**
     * The the relative path the Burst API endpoint, usually '/burst' - must begin with slash
     */
    readonly relativePath: string;
    /**
     * If passed an client instance, it will be used instead of default HttpImpl. Good for testing.
     */
    readonly httpClient?: Http;
}
