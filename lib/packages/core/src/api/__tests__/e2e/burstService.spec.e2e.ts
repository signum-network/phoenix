import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getBlockchainStatus, getServerStatus, getTime, suggestFee} from '../../factories/network';
import {FeeQuantPlanck} from '@burstjs/util';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Burst Service', () => {

    const service = new BurstService({
        nodeHost: environment.testNetHost,
        trustedNodeHosts: [
            'https://invalid.signum.network',
            'https://europe.signum.network',
            'https://brazil.signum.network',
            'https://australia.signum.network',
        ]
    });

    it('should selectBestNode', async () => {
        // @ts-ignore
        expect(service.settings.httpClient._clientImpl.defaults.baseURL).toBe(environment.testNetHost);

        const bestHost =  await service.selectBestHost(true);
        expect(bestHost).toBe('https://brazil.signum.network');
        expect(service.settings.nodeHost).toBe(bestHost);
        // @ts-ignore
        expect(service.settings.httpClient._clientImpl.defaults.baseURL).toBe(bestHost);

    });
});
