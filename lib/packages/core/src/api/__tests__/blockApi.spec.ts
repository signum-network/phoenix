import {HttpMock} from '@burstjs/http';
jest.mock('@burstjs/http/src/http');

import {BurstService} from '../../burstService';
import {getBlockByTimestamp} from '../block/getBlockByTimestamp';
import {getBlockByHeight} from '../block/getBlockByHeight';
import {getBlockById} from '../block/getBlockById';
import {getBlockId} from '../block/getBlockId';

describe('Block Api', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    describe('GetBlock()', () => {

        it('should getBlockByTimestamp', async () => {
            HttpMock.onGet().reply<any>(200, {timestamp: 1});
            // must always be created after HttpMock
            const service = new BurstService('localhost');

            const block = await getBlockByTimestamp(service)(1, false);
            expect(block.timestamp).toBe(1);
        });

        it('should getBlockByHeight', async () => {
            HttpMock.onGet().reply<any>(200, {height: 10});
            // must always be created after HttpMock
            const service = new BurstService('localhost');

            const block = await getBlockByHeight(service)(10, false);
            expect(block.height).toBe(10);
        });

        it('should getBlockById', async () => {
            HttpMock.onGet().reply<any>(200, {block: '123abc'});
            // must always be created after HttpMock
            const service = new BurstService('localhost');

            const block = await getBlockById(service)('123abc', false);
            expect(block.block).toBe('123abc');
        });

        // This failure test is proxy for all block api tests...as implementation is almost identical
        it('should getBlockById fail', async () => {
            HttpMock.onGet().error(500, 'Test Error');
            // must always be created after HttpMock
            const service = new BurstService('localhost');
            try {
                await getBlockById(service)('123abc', false);
                expect(true).toBe('Expected Exception');
            } catch (error) {
                expect(error.message).toBe('Test Error');
                expect(error.status).toBe(500);
            }
        });

    });

    describe('GetBlockId()', () => {

        it('should getBlockId', async () => {
            HttpMock.onGet().reply<any>(200, {block: 100});
            // must always be created after HttpMock
            const service = new BurstService('localhost');

            const block = await getBlockId(service)(1);
            expect(block.block).toBe(100);
        });

    });

});
