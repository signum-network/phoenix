import BlockService from '../../blockService';
import env from './helpers/environment';

describe('[E2E] BlockApi', () => {

    it('should getBlock without transactions included', async () => {
        const blockApi = new BlockService(env.testNetHost, env.testNetApiUrl);
        const block = await blockApi.getBlock(1, false);
        expect(block.height).toBe(1);
    });

});
