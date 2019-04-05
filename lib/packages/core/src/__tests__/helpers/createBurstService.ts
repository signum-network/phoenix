import {Http} from '@burstjs/http';
import {BurstService} from '../../service';

export const createBurstService = (httpClient: Http = undefined, relativePath: string = '', baseUrl: string = 'localhost'): BurstService => {
    return new BurstService({
        nodeHost: baseUrl,
        apiRootUrl: relativePath,
        httpClient,
    });
};
