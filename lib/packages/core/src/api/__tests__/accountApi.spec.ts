import {Http, HttpMockBuilder} from '@burstjs/http';
import {
    getUnconfirmedAccountTransactions,
    getAccountBalance,
    getAccountBlocks,
    getAccountBlockIds,
    generateSendTransactionQRCodeAddress,
    generateSendTransactionQRCode,
    getAccountTransactions,
    getAliases,
    setAccountInfo,
    setRewardRecipient,
    getSubscriptionsToAccount,
    getAccountSubscriptions, getRewardRecipient
} from '../factories/account';
import {Alias} from '../..';
import {AliasList} from '../..';
import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@burstjs/crypto';
import {createBurstService} from '../../__tests__/helpers/createBurstService';
import {convertNumberToNQTString} from '@burstjs/util';


describe('AccountApi', () => {

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
            const args = {accountId: 'accountId'};
            const transactions = await getAccountTransactions(service)(args);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should fail on getAccountTransaction', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createBurstService(httpMock);
            try {
                const args = {accountId: 'accountId'};
                await getAccountTransactions(service)(args);
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });

        it('should getAccountTransaction with paging', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createBurstService(httpMock);
            const args = {accountId: 'accountId', firstIndex: 0, lastIndex: 10};
            const transactions = await getAccountTransactions(service)(args);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should getAccountTransaction with number of confirmations', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createBurstService(httpMock);
            const args = {accountId: 'accountId', confirmations: 10};
            const transactions = await getAccountTransactions(service)(args);
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

    describe('setRewardRecipient', () => {
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
                    'relPath?requestType=setRewardRecipient&publicKey=senderPublicKey&recipient=recipient&feeNQT=12300000000&deadline=1440')
                .onPostReply(200, 'fakeTransaction',
                    'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
                .build();

            service = createBurstService(httpMock, 'relPath');
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should setRewardRecipient', async () => {
            const status = await setRewardRecipient(service)({
                feePlanck: convertNumberToNQTString(123),
                recipientId: 'recipient',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            });

            expect(status).toBe('fakeTransaction');
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });

        it('should throw error if response contains one', async () => {
            mockBroadcastResponse.unsignedTransactionBytes = undefined;
            // @ts-ignore
            mockBroadcastResponse.error = 'error';
            try {
                await setRewardRecipient(service)(
                    {
                        feePlanck: convertNumberToNQTString(123),
                        recipientId: 'recipient',
                        senderPrivateKey: 'senderPrivateKey',
                        senderPublicKey: 'senderPublicKey',
                    }
                );
            } catch (e) {
                expect(e.message).toBe('error');
                expect(generateSignature).toBeCalledTimes(0);
                expect(verifySignature).toBeCalledTimes(0);
                expect(generateSignedTransactionBytes).toBeCalledTimes(0);
            }
        });
    });

    describe('getAccountBlocks()', () => {
        // FIXME: The mocked result is not according the BRS HTTP API!
        it('should getAccountBlocks', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                blocks: [{'block': '1798696848813217050'}]
            }).build();
            const service = createBurstService(httpMock);
            const blockResponse = await getAccountBlocks(service)(1);
            expect(blockResponse.blocks[0].block).toBe('1798696848813217050');
        });

        it('should getAccountBlockIds', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {blockIds: ['123', '456']}).build();
            const service = createBurstService(httpMock);
            const blockResponse = await getAccountBlockIds(service)(1);
            expect(blockResponse.blockIds[0]).toBe('123');
        });

    });

    describe('getAccountSubscriptions()', () => {

        const mockedSubscriptions = {
            'subscriptions': [
                {
                    'id': '11351503202575283428',
                    'sender': '6502115112683865257',
                    'senderRS': 'BURST-K37B-9V85-FB95-793HN',
                    'recipient': '11089308770178933578',
                    'recipientRS': 'BURST-9AUC-LCKL-7W2D-B5BTM',
                    'amountNQT': '100000000',
                    'frequency': 3600,
                    'timeNext': 175560749
                }
            ],
            'requestProcessingTime': 17
        };

        it('should get sender subscriptions', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedSubscriptions).build();
            const service = createBurstService(httpMock);
            const subscriptionList = await getAccountSubscriptions(service)('1');
            expect(subscriptionList.subscriptions).toEqual(mockedSubscriptions.subscriptions);
        });

    });

    describe('getSubscriptionsToAccount()', () => {

        const mockedSubscriptions = {
            'subscriptions': [
                {
                    'id': '11351503202575283428',
                    'sender': '6502115112683865257',
                    'senderRS': 'BURST-K37B-9V85-FB95-793HN',
                    'recipient': '11089308770178933578',
                    'recipientRS': 'BURST-9AUC-LCKL-7W2D-B5BTM',
                    'amountNQT': '100000000',
                    'frequency': 3600,
                    'timeNext': 175560749
                }
            ],
            'requestProcessingTime': 17
        };

        it('should get receiver subscriptions', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedSubscriptions).build();
            const service = createBurstService(httpMock);
            const subscriptionList = await getSubscriptionsToAccount(service)('1');
            expect(subscriptionList.subscriptions).toEqual(mockedSubscriptions.subscriptions);
        });

    });

    describe('getRewardRecipient()', () => {

        const mockedRecipient = {
            'rewardRecipient': '1',
            'requestProcessingTime': 17
        };

        it('should get reward recipient', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedRecipient).build();
            const service = createBurstService(httpMock);
            const rewardRecipient = await getRewardRecipient(service)('1');
            expect(rewardRecipient).toEqual(mockedRecipient);
        });

    });
});
