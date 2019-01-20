import {Block} from '../../block';

jest.mock('@burst/http/src/http');
import {HttpMock} from '@burst/http';

import BlockApi from '../blockApi';

/**
 * This test is a reference implementation to show how Http requests can be mocked
 */
describe('BlockApi', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    it('should getBlock without transactions included', async () => {

        const mockedBlock = new Block({id: 1});
        HttpMock.onGet().reply(200, mockedBlock);

        const blockApi = new BlockApi('localhost');
        const block = await blockApi.getBlock(1, false);
        expect(block.id).toBe(1);
    });

});
