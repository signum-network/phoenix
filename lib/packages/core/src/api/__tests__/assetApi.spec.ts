import {HttpMockBuilder, Http} from '@signumjs/http';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {getAsset} from '../factories/asset/getAsset';
import {cancelAskOrder, cancelBidOrder, placeAskOrder, placeBidOrder, transferAsset} from '../factories';
import {Amount, FeeQuantPlanck} from '@signumjs/util';
import {mockSignAndBroadcastTransaction, createChainService} from '../../__tests__/helpers';

describe('Asset Api', () => {

    let httpMock: Http;

    beforeAll(() => {
        // @ts-ignore
        mockSignAndBroadcastTransaction();
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
            const service = createChainService(httpMock, 'relPath');
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
                const service = createChainService(httpMock, 'relPath');
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

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await placeAskOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                asset: '123',
                quantity: 100,
                pricePlanck: Amount.fromSigna(10).getPlanck(),
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

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await placeBidOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                asset: '123',
                quantity: 100,
                pricePlanck: Amount.fromSigna(10).getPlanck(),
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey'
            });

            expect(transaction).toBe('transactionId');
        });
    });

    describe('cancelAskOrder', () => {
        it('should cancelAskOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=cancelAskOrder&order=123&publicKey=senderPublicKey&feeNQT=735000&deadline=1440')
                .build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await cancelAskOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                order: '123',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey'
            });

            expect(transaction).toBe('transactionId');
        });
    });

    describe('cancelBidOrder', () => {
        it('should cancelBidOrder', async () => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, {
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=cancelBidOrder&order=123&publicKey=senderPublicKey&feeNQT=735000&deadline=1440')
                .build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await cancelBidOrder(service)({
                feePlanck: FeeQuantPlanck + '',
                order: '123',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey'
            });

            expect(transaction).toBe('transactionId');
        });
    });

    describe('transferAsset', () => {
        it('should transferAsset', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, {
                        unsignedTransactionBytes: 'unsignedHexMessage'
                    },
                    'relPath?requestType=transferAsset&asset=123&quantityQNT=100&publicKey=senderPublicKey&recipient=recipientId&feeNQT=735000&deadline=1440'
                ).build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await transferAsset(service)({
                asset: '123',
                feePlanck: FeeQuantPlanck + '',
                quantity: 100,
                recipientId: 'recipientId',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            });

            expect(transaction).toBe('transactionId');
        });
    });

});
