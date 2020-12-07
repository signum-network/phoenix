import {HttpMockBuilder, Http} from '@burstjs/http';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {createBurstService} from '../../__tests__/helpers/createBurstService';
import {getAsset} from '../factories/asset/getAsset';
import {signAndBroadcastTransaction} from '../factories/transaction/signAndBroadcastTransaction';
import {placeAskOrder, placeBidOrder} from '../factories';
import {BurstValue, FeeQuantPlanck} from '@burstjs/util';

describe('Asset Api', () => {

    let httpMock: Http;

    beforeAll(() => {
        // @ts-ignore
        signAndBroadcastTransaction = jest.fn().mockImplementation(() => () => Promise.resolve({transaction: 'transactionId'}));
    });

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('getAsset', () => {
        it('should getAsset', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                account: 'accountId',
                accountRS: 'BURST-ADDRESS',
                name: 'TestName',
                description: 'Test Description',
                decimals: 0,
                quantityQNT: '100000000000000000',
                asset: 'assetId',
                numberOfTrades: 0,
                numberOfTransfers: 10,
                numberOfAccounts: 100,
            }).build();
            const service = createBurstService(httpMock, 'relPath');
            const asset = await getAsset(service)('assetId');
            expect(asset).toEqual({
                account: 'accountId',
                accountRS: 'BURST-ADDRESS',
                name: 'TestName',
                description: 'Test Description',
                decimals: 0,
                quantityQNT: '100000000000000000',
                asset: 'assetId',
                numberOfTrades: 0,
                numberOfTransfers: 10,
                numberOfAccounts: 100,
            });
        });

        it('should fail on getAsset', async () => {
            try {
                httpMock = HttpMockBuilder.create().onGetThrowError(500, 'Internal Server Error').build();
                const service = createBurstService(httpMock, 'relPath');
                await getBlockchainStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

    describe('placeAskOrder', () => {
        it('should placeAskOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=placeAskOrder&asset=123&priceNQT=1000000000&quantityQNT=100&publicKey=senderPublicKey&feeNQT=735000&deadline=1440')
                .build();

            const service = createBurstService(httpMock, 'relPath');
            const {transaction} = await placeAskOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                asset: '123',
                quantity: 100,
                price: BurstValue.fromBurst(10),
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey'
            });

            expect(transaction).toBe('transactionId');
        });
    });

    describe('placeBidOrder', () => {
        it('should placeBidOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=placeBidOrder&asset=123&priceNQT=1000000000&quantityQNT=100&publicKey=senderPublicKey&feeNQT=735000&deadline=1440')
                .build();

            const service = createBurstService(httpMock, 'relPath');
            const {transaction} = await placeBidOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                asset: '123',
                quantity: 100,
                price: BurstValue.fromBurst(10),
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey'
            });

            expect(transaction).toBe('transactionId');
        });
    });
});
