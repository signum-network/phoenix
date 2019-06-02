import {HttpMockBuilder, Http} from '@burstjs/http';
import {createBurstService} from '../../__tests__/helpers/createBurstService';
import {getContract} from '../factories/contract';

describe('Contract Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('getContract', () => {

        const testContract = {
            creator: 'creator',
            creatorRS: 'CreatorRS',
            at: 'at',
            atRS: 'atRS',
            atVersion: 1,
            name: 'Name',
            description: 'description',
            machineCode: 'machineCode',
            machineData: 'machineData',
            balanceNQT: '0',
            prevBalanceNQT: '0',
            nextBlock: 2,
            frozen: true,
            running: true,
            stopped: false,
            finished: false,
            dead: false,
            minActivation: '1000',
            creationBlock: 1,
            requestProcessingTime: 1
        };

        it('should getContract', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, testContract).build();
            const service = createBurstService(httpMock, 'relPath');
            const contract = await getContract(service)('1234');
            expect(contract.creator).toBe('creator');
            expect(contract.at).toBe('at');
            // rest is implicit
        });
    });
});
