import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getAllAssets, getAsset} from '../../factories/asset';
import {issueAsset} from '../../factories/asset/issueAsset';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {BurstValue} from '@burstjs/util';


describe(`[E2E] Asset Api`, () => {

    let environment;
    let service;
    let senderKeys;
    let recipientKeys;
    let recipientId;

    beforeAll(() => {
        environment = loadEnvironment();
        service = new BurstService({
            nodeHost: environment.testNetHost,
            apiRootUrl: environment.testNetApiPath
        });
        jest.setTimeout(environment.timeout);

        senderKeys = generateMasterKeys(environment.testPassphrase);
        recipientKeys = generateMasterKeys(environment.testRecipientPassphrase);
        recipientId = getAccountIdFromPublicKey(recipientKeys.publicKey);
    });

    it('should getAsset', async () => {
        const asset = await getAsset(service)(environment.testAssetId);
        expect(asset).not.toBeUndefined();
    });

    it('should getAllAssets', async () => {
        const assetList = await getAllAssets(service)();
        expect(assetList.assets.length).toBeGreaterThan(0);
    });

    it('should issueAsset', async () => {
        const response = await issueAsset(service)({
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            amount: BurstValue.fromBurst(1000),
            quantity: 50 * 1000,
            decimals: 4,
            name: 'BurstJS',
            description: '[E2E] BurstJS Test Asset'
        });
        expect(response.transaction).toBeDefined();
    });
});
