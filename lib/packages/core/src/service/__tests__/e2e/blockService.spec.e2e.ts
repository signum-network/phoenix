import {BlockService} from '../../blockService';
import {environment} from './helpers/environment';

describe('[E2E] BlockApi', () => {

    it('should getBlockByHeight from Test Net', async () => {
        const blockApi = new BlockService(environment.testNetHost, environment.testNetApiUrl);
        const block = await blockApi.getBlockByHeight(1, false);
        expect(block.height).toBe(1);
    });

});
