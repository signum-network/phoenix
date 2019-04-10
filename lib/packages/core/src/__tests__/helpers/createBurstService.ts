import {Http} from '@burstjs/http';
import {BurstService} from '../../service';

export const createBurstService = (
    httpClient: Http = undefined,
    apiRootUrl: string = '',
    nodeHost: string = 'localhost',
): BurstService => {
    return new BurstService({
        nodeHost,
        apiRootUrl,
        httpClient,
    });
};
