import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getBlockByTimestamp} from '../../factories/block/getBlockByTimestamp';
import {getBlockByHeight} from '../../factories/block/getBlockByHeight';
import {getBlockById} from '../../factories/block/getBlockById';
import {getBlockId} from '../../factories/block/getBlockId';
import {HttpError} from '@burstjs/http';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe(`[E2E] Block Api`, () => {

    const service = new BurstService({
        nodeHost: environment.testNetHost,
        apiRootUrl: environment.testNetApiPath
    });

    it('should getBlockByTimestamp', async () => {
        const block = await getBlockByTimestamp(service)(1000, false);
        // always returns block zero
        expect(block).not.toBeUndefined();
    });

    it(`should getBlockByHeight`, async () => {
        const block = await getBlockByHeight(service)(10, false);
        expect(block).not.toBeUndefined();
        expect(block.block).toBe('15105048788654004778');
        expect(block.height).toBe(10);
    });

    it(`should getBlockById`, async () => {
        const block = await getBlockById(service)('15105048788654004778', false);
        expect(block).not.toBeUndefined();
        expect(block.block).toBe('15105048788654004778');
        expect(block.height).toBe(10);
    });

    it(`should getBlockId`, async () => {
        const block = await getBlockId(service)(10);
        expect(block).not.toBeUndefined();
        expect(block.block).toBe('15105048788654004778');
    });

    it(`should fail on unknown getBlockId`, async () => {
        try {
            await getBlockId(service)(99999999);
            expect('Should throw exception').toBeFalsy();
        } catch (e) {
            const httpError = <HttpError>e;
            expect(httpError.message).toContain('Incorrect "height"');
            expect(httpError.message).toContain('4'); // error code
            expect(httpError.data).toEqual(expect.objectContaining({
                'errorCode': 4,
                'errorDescription': 'Incorrect "height"'
            }));
        }
    });
});
