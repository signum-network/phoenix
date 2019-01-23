import {environment} from './helpers/environment';
import {NetworkService} from '../../networkService';

describe('[E2E] Network Status Api', () => {

    it('should getBlockchainStatus from Test Net', async () => {
        const networkService = new NetworkService(environment.testNetHost, environment.testNetApiUrl);
        const status = await networkService.getBlockchainStatus();
        expect(status.application).toBe('BRS');
        expect(status.version.startsWith('2.')).toBeTruthy();
        expect(status.lastBlock).not.toBeUndefined();
        expect(status.cumulativeDifficulty).not.toBeUndefined();
        expect(status.isScanning).not.toBeUndefined();
        expect(status.lastBlockchainFeeder).not.toBeUndefined();
        expect(status.lastBlockchainFeederHeight).not.toBeUndefined();
        expect(status.numberOfBlocks).not.toBeUndefined();
        expect(status.time).not.toBeUndefined();
    });

    it('should getNetworksStatus from Test Net', async () => {
        const networkService = new NetworkService(environment.testNetHost, environment.testNetApiUrl);
        const status = await networkService.getNetworkStatus();
        expect(status.version.startsWith('2.')).toBeTruthy();
        expect(status.application).toBe('BRS');
        expect(status.availableProcessors).toBeGreaterThanOrEqual(1);
        expect(status.numberOfPeers).not.toBeUndefined();
        expect(status.numberOfUnlockedAccounts).not.toBeUndefined();
        expect(status.numberOfTransfers).not.toBeUndefined();
        expect(status.numberOfOrders).not.toBeUndefined();
        expect(status.numberOfTransactions).not.toBeUndefined();
        expect(status.maxMemory).not.toBeUndefined();
        expect(status.isScanning).not.toBeUndefined();
        expect(status.cumulativeDifficulty).not.toBeUndefined();
        expect(status.numberOfAssets).not.toBeUndefined();
        expect(status.freeMemory).not.toBeUndefined();
        expect(status.totalEffectiveBalanceNXT).not.toBeUndefined();
        expect(status.numberOfAccounts).not.toBeUndefined();
        expect(status.numberOfBlocks).not.toBeUndefined();
        expect(status.version).not.toBeUndefined();
        expect(status.numberOfBidOrders).not.toBeUndefined();
        expect(status.lastBlock).not.toBeUndefined();
        expect(status.totalMemory).not.toBeUndefined();
        expect(status.numberOfAliases).not.toBeUndefined();
        expect(status.lastBlockchainFeederHeight).not.toBeUndefined();
        expect(status.numberOfTrades).not.toBeUndefined();
        expect(status.time).not.toBeUndefined();
        expect(status.numberOfAskOrders).not.toBeUndefined();
        expect(status.lastBlockchainFeeder).not.toBeUndefined();

    });

});
