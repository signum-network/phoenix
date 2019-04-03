import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../burstService';
import {decryptMessage, generateMasterKeys} from '@burstjs/crypto';
import {sendTextMessage} from '../../factories/message/sendTextMessage';
import {sendEncryptedTextMessage} from '../../factories/message/sendEncryptedTextMessage';
import {getTransaction} from '../../factories/transaction/getTransaction';


describe('[E2E] Message Api', () => {

    let environment;
    let service;

    beforeAll(() => {
        environment = loadEnvironment();
        service = new BurstService(environment.testNetHost, environment.testNetApiPath);
        jest.setTimeout(environment.timeout);

    });


    it('should sendTextMessage', async () => {
        const keys = generateMasterKeys(environment.testPassphrase);

        const transactionId = await sendTextMessage(service)(
            '[E2E] sendTextMessage TEST',
            environment.testRecipientId,
            keys.publicKey,
            keys.signPrivateKey,
            1440,
            0.05
        );

        expect(transactionId).not.toBeUndefined();

    });


    it('should sendEncryptedTextMessage', async () => {
        const keys = generateMasterKeys(environment.testPassphrase);

        const transactionId = await sendEncryptedTextMessage(service)(
            '[E2E] sendEncryptedTextMessage TEST (encrypted)',
            environment.testRecipientId,
            environment.testRecipientPublicKey,
            keys,
            1440,
            0.05
        );

        expect(transactionId).not.toBeUndefined();

    });


    // FIXME: using
    it('should get a transaction from BRS with encrypted message and decrypt successfully', async () => {
        const keys = generateMasterKeys(environment.testRecipientPassPhrase);

        const transaction = await getTransaction(service)('16687770235948514357');
        expect(transaction).not.toBeUndefined();

        const encryptedMessage = transaction.attachment;

        const message = decryptMessage(encryptedMessage, transaction.senderPublicKey, keys.signPrivateKey);
        expect(message).toBeDefined();

    });



});
