import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Burst Service', () => {

    it('should selectBestNode and reconfigure accordingly', async () => {
        const service = new BurstService({
            nodeHost: environment.testNetHost,
            trustedNodeHosts: [
                'https://invalid.signum.network',
                'https://europe.signum.network',
                'https://brazil.signum.network',
                'https://australia.signum.network',
            ]
        });
        // @ts-ignore
        expect(service.settings.httpClient._clientImpl.defaults.baseURL).toBe(environment.testNetHost);

        const bestHost =  await service.selectBestHost(true);
        expect(bestHost).toBe('https://brazil.signum.network');
        expect(service.settings.nodeHost).toBe(bestHost);
        // @ts-ignore
        expect(service.settings.httpClient._clientImpl.defaults.baseURL).toBe(bestHost);

    });

    it('should fail on entirely invalid hosts without reconfiguration', async () => {
        jest.setTimeout(15 * 1000);
        const service = new BurstService({
            nodeHost: environment.testNetHost,
            trustedNodeHosts: [
                'https://invalid.signum.network',
                'https://invalid1.signum.network',
                'https://invalid2.signum.network',
            ]
        });
        try{
            await service.selectBestHost(true);
            expect('Expected exception').toBeFalsy();
        }catch (e){
            // @ts-ignore
            expect(service.settings.httpClient._clientImpl.defaults.baseURL).toBe(environment.testNetHost);
            expect(service.settings.nodeHost).toBe(environment.testNetHost);
        }
        jest.setTimeout(environment.timeout);
    });
});
