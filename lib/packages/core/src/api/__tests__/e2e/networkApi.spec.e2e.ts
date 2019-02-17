import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../burstService';
import {getBlockchainStatus} from '../../factories/network/getBlockchainStatus';
import {getServerStatus} from '../../factories/network/getServerStatus';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Network Api', () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiPath);

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

});
