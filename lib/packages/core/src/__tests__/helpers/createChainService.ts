import {Http} from '@signumjs/http';
import {ChainService} from '../../service';

export const createChainService = (
    httpClient: Http = undefined,
    apiRootUrl: string = '',
    nodeHost: string = 'localhost',
): ChainService => {
    return new ChainService({
        nodeHost,
        apiRootUrl,
        httpClient,
    });
};
