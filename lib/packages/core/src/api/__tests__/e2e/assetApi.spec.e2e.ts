import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {cancelBidOrder, getAllAssets, getAsset, placeBidOrder} from '../../factories/asset';
import {issueAsset} from '../../factories/asset/issueAsset';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@signumjs/crypto';
import {BurstValue, FeeQuantPlanck} from '@signumjs/util';


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
            amountPlanck: BurstValue.fromBurst(1000).getPlanck(),
            quantity: 50 * 1000,
            decimals: 4,
            name: 'BurstJS',
            description: '[E2E] BurstJS Test Asset'
        });
        expect(response.transaction).toBeDefined();
    });

    it('should placeBidOrder', async () => {
        const response = await placeBidOrder(service)({
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            pricePlanck: BurstValue.fromBurst(1).getPlanck(),
            feePlanck: FeeQuantPlanck + '',
            quantity: 1,
            asset: '8485879651352780597',
        });

        expect(response.transaction).toBeDefined();
    });

    it('should cancelBidOrder', async () => {
        const response = await cancelBidOrder(service)({
            order: '16628182565696352125',
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            feePlanck: FeeQuantPlanck + '',
        });
        expect(response.transaction).toBeDefined();
    });
});
