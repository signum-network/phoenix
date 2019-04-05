import {HttpMockBuilder, Http} from '@burstjs/http';

import {BurstService} from '../../service/burstService';
import {getBlockByTimestamp} from '../factories/block/getBlockByTimestamp';
import {getBlockByHeight} from '../factories/block/getBlockByHeight';
import {getBlockById} from '../factories/block/getBlockById';
import {getBlockId} from '../factories/block/getBlockId';
import {createBurstService} from '../../__tests__/helpers/createBurstService';

describe('Block Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('GetBlock()', () => {

        it('should getBlockByTimestamp', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {timestamp: 1}).build();
            const service = createBurstService(httpMock);
            const block = await getBlockByTimestamp(service)(1, false);
            expect(block.timestamp).toBe(1);
        });

        it('should getBlockByHeight', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {height: 10}).build();
            const service = createBurstService(httpMock);
            const block = await getBlockByHeight(service)(10, false);
            expect(block.height).toBe(10);
        });

        it('should getBlockById', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {block: '123abc'}).build();
            const service = createBurstService(httpMock);
            const block = await getBlockById(service)('123abc', false);
            expect(block.block).toBe('123abc');
        });

        // This failure test is proxy for all block api tests...as implementation is almost identical
        it('should getBlockById fail', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(500, 'Test Error').build();
            const service = createBurstService(httpMock);
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
            httpMock = HttpMockBuilder.create().onGetReply(200, {block: 100}).build();
            const service = createBurstService(httpMock);
            const block = await getBlockId(service)(1);
            expect(block.block).toBe(100);
        });

    });

});
