import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getBlockchainStatus, getServerStatus, getTime, suggestFee} from '../../factories/network';
import {FeeQuantPlanck} from '@signumjs/util';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Network Api', () => {

    const service = new BurstService({
        nodeHost: environment.testNetHost,
        apiRootUrl: environment.testNetApiPath
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

    it('should suggestFee', async () => {
        const status = await suggestFee(service)();
        expect(status.minimum).toBe(FeeQuantPlanck);
        expect(status.cheap).toBeGreaterThanOrEqual(FeeQuantPlanck);
        expect(status.standard).toBeGreaterThanOrEqual(FeeQuantPlanck);
        expect(status.priority).toBeGreaterThanOrEqual(FeeQuantPlanck);
    });

});
