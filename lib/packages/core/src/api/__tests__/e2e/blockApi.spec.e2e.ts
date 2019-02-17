import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../burstService';
import {getBlockByTimestamp} from '../../block/getBlockByTimestamp';
import {getBlockByHeight} from '../../block/getBlockByHeight';
import {getBlockById} from '../../block/getBlockById';
import {getBlockId} from '../../block/getBlockId';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe(`[E2E] Block Api`, () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiPath);

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

});
