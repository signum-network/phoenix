import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getBlockchainStatus} from '../../factories/network/getBlockchainStatus';
import {getServerStatus} from '../../factories/network/getServerStatus';
import {getTime} from '../../factories/network/getTime';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Network Api', () => {

    const service = new BurstService({
        baseUrl: environment.testNetHost,
        relativePath: environment.testNetApiPath
    });

    it('should getBlockchainStatus', async () => {
        const status = await getBlockchainStatus(service)();
        expect(status.application).toBe('BRS');
        expect(status.numberOfBlocks).toBeGreaterThan(1);
    });

    it('should getNetworkState', async () => {

        const status = await getServerStatus(service)();
        expect(status.application).toBe('BRS');
        expect(status.numberOfAccounts).toBeGreaterThan(1);
        expect(status.numberOfPeers).toBeGreaterThan(1);
    });

    it('should getTime', async () => {
        const status = await getTime(service)();
        expect(status.time).toBeGreaterThan(0);
    });

});
