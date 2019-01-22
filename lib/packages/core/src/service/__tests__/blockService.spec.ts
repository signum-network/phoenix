// IMPORTANT: mocking http at first
jest.mock('@burst/http/src/http');
import {HttpMock} from '@burst/http';

import BlockService from '../blockService';
import {Block} from '../../model/block';

describe('BlockApi', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    it('should getBlock without transactions included', async () => {

        const mockedBlock = new Block({height: 1});
        HttpMock.onGet().reply(200, mockedBlock);

        const blockApi = new BlockService('localhost');
        const block = await blockApi.getBlock(1, false);
        expect(block.height).toBe(1);
    });

});
