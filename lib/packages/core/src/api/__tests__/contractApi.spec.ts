import {Http, HttpMockBuilder} from '@burstjs/http';
import {createBurstService} from '../../__tests__/helpers/createBurstService';
import {getContract, getContractsByAccount, publishContract} from '../factories/contract';
import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@burstjs/crypto';
import {generateContract} from '@burstjs/contracts';

describe('Contract Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

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

    describe('getContract', () => {

        it('should getContract', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, testContract).build();
            const service = createBurstService(httpMock, 'relPath');
            const contract = await getContract(service)('1234');
            expect(contract.creator).toBe('creator');
            expect(contract.at).toBe('at');
            // rest is implicit
        });
    });

    describe('getContractsByAccount', () => {

        const testContracts = {
            ats: [testContract],
            requestProcessingTime: 1
        };

        it('should getContractsByAccount', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, testContracts).build();
            const service = createBurstService(httpMock, 'relPath');
            const contracts = await getContractsByAccount(service)('1234');
            expect(contracts.ats).toHaveLength(1);
            expect(contracts.ats[0]).toEqual(testContract);
        });
    });


    describe('publishContract', () => {

        beforeEach(() => {
            jest.resetAllMocks();
            generateSignature = jest.fn(() => 'signature');
            verifySignature = jest.fn(() => true);
            generateSignedTransactionBytes = jest.fn(() => 'signedTransactionBytes');
            generateContract = jest.fn(() => 'hexCode');
        });


        it('should publishContract', async () => {

            const testResponse = {
                fullHash: 'fullHash',
                transaction: 'transactionId'
            };

            httpMock = HttpMockBuilder.create()
                .onPostReply(200, testResponse).build();

            const service = createBurstService(httpMock, 'relPath');
            const transaction = await publishContract(service)({
                activationAmountPlanck: '20000000',
                codeHex: 'creationBytes',
                description: 'description',
                feePlanck: '10000000',
                name: 'testContract',
                senderPublicKey: 'publickey',
                senderPrivateKey: 'privateKey'
            });
            expect(transaction).toEqual({
                fullHash: 'fullHash',
                transaction: 'transactionId'
            });
        });
    });
});
