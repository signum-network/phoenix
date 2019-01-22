import env from './helpers/environment';
import NetworkService from '../../networkService';

describe('[E2E] Network Status Api', () => {

    it('should getBlockchainStatus from Test Net', async () => {
        const networkService = new NetworkService(env.testNetHost, env.testNetApiUrl);
        const status = await networkService.getBlockchainStatus();
        expect(status.application).toBe('BRS');
        expect(status.version.startsWith('2.')).toBeTruthy();
        expect(status.lastBlock).not.toBeUndefined();
        expect(status.cumulativeDifficulty).not.toBeUndefined();
        expect(status.isScanning).not.toBeUndefined();
        expect(status.lastBlockchainFeeder).not.toBeUndefined();
        expect(status.lastBlockchainFeederHeight).not.toBeUndefined();
        expect(status.numberOfBlocks).not.toBeUndefined();
        expect(status.requestProcessingTime).not.toBeUndefined();
        expect(status.time).not.toBeUndefined();
    });

});
