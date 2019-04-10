import {Http} from '@burstjs/http';
import {BrsVersion} from '../../constants/brsVersion';
import {BurstService} from '../../service';

export const createBurstService = (
    httpClient: Http = undefined,
    apiRootUrl: string = '',
    nodeHost: string = 'localhost',
    brsVersion: BrsVersion = undefined,
): BurstService => {
    return new BurstService({
        nodeHost,
        apiRootUrl,
        httpClient,
        brsVersion
    });
};
