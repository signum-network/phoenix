import {Http, HttpMockBuilder} from '@burstjs/http';
import {getAccountTransactions} from '../factories/account/getAccountTransactions';
import {getUnconfirmedAccountTransactions} from '../factories/account/getUnconfirmedAccountTransactions';
import {getAccountBalance} from '../factories/account/getAccountBalance';
import {generateSendTransactionQRCodeAddress} from '../factories/account/generateSendTransactionQRCodeAddress';
import {generateSendTransactionQRCode} from '../factories/account/generateSendTransactionQRCode';
import {getAliases} from '../factories/account/getAliases';
import {setAccountInfo} from '../factories/account/setAccountInfo';
import {Alias} from '../../typings/alias';
import {AliasList} from '../../typings/aliasList';
import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@burstjs/crypto';
import {createBurstService} from '../../__tests__/helpers/createBurstService';


describe('Account Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('GetAccountTransactions()', () => {
        const mockedTransactions = {
            'requestProcessingTime': 738,
            'transactions': [{
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 659,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 10,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 20
            }, {
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 659,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 21,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 30
            }]
        };

        it('should getAccountTransaction without paging', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createBurstService(httpMock);
            const transactions = await getAccountTransactions(service)('accountId');
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should fail on getAccountTransaction', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createBurstService(httpMock);
            try {
                await getAccountTransactions(service)('accountId');
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });

        it('should getAccountTransaction with paging', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createBurstService(httpMock);
            const transactions = await getAccountTransactions(service)('accountId', 0, 10);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should getAccountTransaction with number of confirmations', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createBurstService(httpMock);
            const transactions = await getAccountTransactions(service)('accountId', undefined, undefined, 10);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });
    });

    describe('GetUnconfirmedAccountTransactions()', () => {
        const mockedTransactions = {
            'requestProcessingTime': 738,
            'unconfirmedTransactions': [{
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 0,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 10,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 20
            }
            ]
        };

        it('should getUnconfirmedAccountTransactions', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createBurstService(httpMock);
            const transactions = await getUnconfirmedAccountTransactions(service)('accountId');
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.unconfirmedTransactions).toHaveLength(1);
        });

        it('should fail on getUnconfirmedAccountTransactions', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createBurstService(httpMock);
            try {
                await getUnconfirmedAccountTransactions(service)('accountId');
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('GetAccountBalance', () => {

        it('should getAccountBalance', async () => {
            const mockedBalance = {
                unconfirmedBalanceNQT: '100000000000',
                guaranteedBalanceNQT: '100000000000',
                effectiveBalanceNXT: '100000000000',
                forgedBalanceNQT: '0',
                balanceNQT: '100000000000',
                requestProcessingTime: 0
            };

            httpMock = HttpMockBuilder.create().onGetReply(200, mockedBalance).build();
            const service = createBurstService(httpMock);
            const balance = await getAccountBalance(service)('accountId');
            expect(balance.requestProcessingTime).toBe(0);
            expect(balance.unconfirmedBalanceNQT).toBe('100000000000');
            expect(balance.guaranteedBalanceNQT).toBe('100000000000');
            expect(balance.effectiveBalanceNXT).toBe('100000000000');
            expect(balance.balanceNQT).toBe('100000000000');
            expect(balance.forgedBalanceNQT).toBe('0');
        });

        it('should fail getAccountBalance', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createBurstService(httpMock);
            try {
                await getAccountBalance(service)('accountId');
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('generateSendTransactionQRCode', () => {
        const mockAddress = `BURST-K8MA-U2JT-R6DJ-FVQLC`;

        it('should expose a method for constructing the URL', async () => {
            // tslint:disable-next-line
            const expected = 'relPath?requestType=generateSendTransactionQRCode&receiverId=BURST-K8MA-U2JT-R6DJ-FVQLC&amountNQT=0&feeSuggestionType=standard';
            const service = createBurstService(httpMock, 'relPath');
            const generatedImageUrl = await generateSendTransactionQRCodeAddress(service)(mockAddress);
            expect(generatedImageUrl).toBe(expected);
        });

        it('should fetch the QR image', async () => {
            const mockedImage = new ArrayBuffer(1337);
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedImage).build();
            const service = createBurstService(httpMock);
            const generatedImage = await generateSendTransactionQRCode(service)(mockAddress);
            expect(generatedImage.byteLength).toBe(1337);
        });

        it('should fail generateSendTransactionQRCode', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createBurstService(httpMock);
            try {
                await generateSendTransactionQRCode(service)(mockAddress);
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('getAliases', () => {

        it('should getAliases', async () => {
            const mockAlias: Alias = {
                account: '12345',
                accountRS: 'BURST-K8MA-U2JT-R6DJ-FVQLC`',
                alias: '12345',
                aliasName: 'test',
                aliasURI: 'acct:burst-K8MA-U2JT-R6DJ-FVQLC@burst',
                timestamp: 131932255
            };
            const mockResponse: AliasList = {
                aliases: [mockAlias],
                requestProcessingTime: 1337
            };

            httpMock = HttpMockBuilder.create().onGetReply(200, mockResponse).build();
            const service = createBurstService(httpMock);
            const aliasesResponse = await getAliases(service)('accountId');
            expect(aliasesResponse.aliases).toHaveLength(1);
        });

        it('should fail getAliases', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createBurstService(httpMock);
            try {
                await getAliases(service)('accountId');
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });


    describe('setAccountInfo', () => {
        let service;

        const mockBroadcastResponse = {
            unsignedTransactionBytes: 'unsignedHexMessage'
        };

        beforeEach(() => {

            jest.resetAllMocks();

            // @ts-ignore
            generateSignature = jest.fn(() => 'signature');
            // @ts-ignore
            verifySignature = jest.fn(() => true);
            // @ts-ignore
            generateSignedTransactionBytes = jest.fn(() => 'signedTransactionBytes');

            httpMock = HttpMockBuilder.create()
            // tslint:disable:max-line-length
                .onPostReply(200, mockBroadcastResponse,
                    'relPath?requestType=setAccountInfo&name=name&description=description&deadline=1440&feeNQT=12300000000&publicKey=senderPublicKey')
                .onPostReply(200, 'fakeTransaction',
                    'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
                .build();

            service = createBurstService(httpMock, 'relPath');
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should setAccountInfo', async () => {
            const status = await setAccountInfo(service)(
                'name',
                'description',
                '123',
                'senderPublicKey',
                'senderPrivateKey',
                1440,
            );
            expect(status).toBe('fakeTransaction');
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });
    });
});
