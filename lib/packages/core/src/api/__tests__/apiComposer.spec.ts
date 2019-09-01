import {ApiComposer} from '../apiComposer';
import {getBlockById} from '../factories/block/getBlockById';
import {getBlockByHeight} from '../factories/block/getBlockByHeight';
import {getBlockId} from '../factories/block/getBlockId';
import {getBlockByTimestamp} from '../factories/block/getBlockByTimestamp';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {getServerStatus} from '../factories/network/getServerStatus';
import {suggestFee} from '../factories/network/suggestFee';
import {broadcastTransaction} from '../factories/transaction/broadcastTransaction';
import {getTransaction} from '../factories/transaction/getTransaction';
import {sendMoney} from '../factories/transaction/sendMoney';
import {sendTextMessage} from '../factories/message/sendTextMessage';
import {getAccountTransactions} from '../factories/account/getAccountTransactions';
import {getUnconfirmedAccountTransactions} from '../factories/account/getUnconfirmedAccountTransactions';
import {generateSendTransactionQRCode} from '../factories/account/generateSendTransactionQRCode';
import {getAccountBalance} from '../factories/account/getAccountBalance';
import {getAccountBlocks} from '../factories/account/getAccountBlocks';
import {getAccountBlockIds} from '../factories/account/getAccountBlockIds';
import {generateSendTransactionQRCodeAddress} from '../factories/account/generateSendTransactionQRCodeAddress';
import {createBurstService} from '../../__tests__/helpers/createBurstService';
import {getContract} from '../factories/contract';
import {getContractsByAccount} from '../../../out/api/factories/contract';


describe('ApiComposer', () => {
    const burstService = createBurstService();
    let apiComposer;

    beforeEach(() => {
        apiComposer = ApiComposer.create(burstService);
    });


    describe('mapCreators (private)', () => {

        it('should map creators correctly', () => {

            // @ts-ignore
            apiComposer.mapCreators('block', {getBlockById});

            const api = apiComposer.compose();

            expect(api.block.getBlockById).toBeDefined();
            expect(api.block.getBlockByHeight).not.toBeDefined();
            expect(api.network).not.toBeDefined();

            const getBlockByIdFn = getBlockById(burstService);
            expect(getBlockByIdFn.toString()).toEqual(api.block.getBlockById.toString());

        });

    });

    it('should compose (empty) Api', () => {
        const api = apiComposer.compose();

        expect(api).toBeDefined();
        expect(api.block).not.toBeDefined();
        expect(api.account).not.toBeDefined();
        expect(api.message).not.toBeDefined();
        expect(api.network).not.toBeDefined();
        expect(api.transaction).not.toBeDefined();
    });

    it('should compose block Api', () => {

        const api = apiComposer.withBlockApi({
            getBlockById,
            getBlockByHeight,
            getBlockByTimestamp,
            getBlockId,
        }).compose();
        expect(api).toBeDefined();

        expect(api.block).toBeDefined();
        expect(api.block.getBlockById).toBeDefined();
        expect(api.block.getBlockByHeight).toBeDefined();
        expect(api.block.getBlockByTimestamp).toBeDefined();
        expect(api.block.getBlockId).toBeDefined();

    });

    it('should compose network Api', () => {

        const api = apiComposer
            .withNetworkApi({
                getBlockchainStatus,
                getServerStatus,
                suggestFee,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.network).toBeDefined();
        expect(api.network.getBlockchainStatus).toBeDefined();
        expect(api.network.getServerStatus).toBeDefined();
        expect(api.network.suggestFee).toBeDefined();

    });

    it('should compose transaction Api', () => {

        const api = apiComposer
            .withTransactionApi({
                broadcastTransaction,
                getTransaction,
                sendMoney,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.transaction).toBeDefined();
        expect(api.transaction.broadcastTransaction).toBeDefined();
        expect(api.transaction.getTransaction).toBeDefined();
        expect(api.transaction.sendMoney).toBeDefined();

    });

    it('should compose message Api', () => {

        const api = apiComposer
            .withMessageApi({
                sendTextMessage
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.message).toBeDefined();
        expect(api.message.sendTextMessage).toBeDefined();

    });

    it('should compose account Api', () => {

        const api = apiComposer
            .withAccountApi({
                getAccountTransactions,
                getUnconfirmedAccountTransactions,
                getAccountBalance,
                generateSendTransactionQRCode,
                generateSendTransactionQRCodeAddress,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.account).toBeDefined();
        expect(api.account.getAccountTransactions).toBeDefined();
        expect(api.account.getUnconfirmedAccountTransactions).toBeDefined();
        expect(api.account.getAccountBalance).toBeDefined();
        expect(api.account.generateSendTransactionQRCode).toBeDefined();
        expect(api.account.generateSendTransactionQRCodeAddress).toBeDefined();

    });

    it('should compose contract Api', () => {

        const api = apiComposer
            .withContractApi({
                getContract,
                getContractsByAccount
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.contract).toBeDefined();
        expect(api.contract.getContract).toBeDefined();
        expect(api.contract.getContractsByAccount).toBeDefined();

    });


    it('should compose account Api with multiple modules', () => {

        const api = apiComposer
            .withMessageApi({
                sendTextMessage
            })
            .withAccountApi({
                getAccountTransactions,
                getUnconfirmedAccountTransactions,
                getAccountBalance,
                getAccountBlocks,
                getAccountBlockIds,
                generateSendTransactionQRCode,
                generateSendTransactionQRCodeAddress,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.account).toBeDefined();
        expect(api.account.getAccountTransactions).toBeDefined();
        expect(api.account.getUnconfirmedAccountTransactions).toBeDefined();
        expect(api.account.getAccountBalance).toBeDefined();
        expect(api.account.getAccountBlocks).toBeDefined();
        expect(api.account.getAccountBlockIds).toBeDefined();
        expect(api.account.generateSendTransactionQRCode).toBeDefined();
        expect(api.account.generateSendTransactionQRCodeAddress).toBeDefined();

       expect(api).toBeDefined();
       expect(api.message).toBeDefined();
       expect(api.message.sendTextMessage).toBeDefined();

   });

});
