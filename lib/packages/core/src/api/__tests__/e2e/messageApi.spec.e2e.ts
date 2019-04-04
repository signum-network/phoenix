import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../burstService';
import {decryptMessage, generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {sendTextMessage} from '../../factories/message/sendTextMessage';
import {sendEncryptedTextMessage} from '../../factories/message/sendEncryptedTextMessage';
import {getTransaction} from '../../factories/transaction/getTransaction';
import {assertAttachmentVersion} from '../../../attachment/assertAttachmentVersion';


describe('[E2E] Message Api', () => {

    let environment;
    let service;
    let senderKeys;
    let recipientKeys;
    let recipientId;

    beforeAll(() => {
        environment = loadEnvironment();
        service = new BurstService(environment.testNetHost, environment.testNetApiPath);
        jest.setTimeout(environment.timeout);

        senderKeys = generateMasterKeys(environment.testPassphrase);
        recipientKeys = generateMasterKeys(environment.testRecipientPassphrase);
        recipientId = getAccountIdFromPublicKey(recipientKeys.publicKey);
    });


    it('should sendTextMessage', async () => {

        const transactionId = await sendTextMessage(service)(
            '[E2E] sendTextMessage TEST',
            recipientId,
            senderKeys.publicKey,
            senderKeys.signPrivateKey,
            1440,
            0.05
        );

        expect(transactionId).not.toBeUndefined();

    });


    it('should sendEncryptedTextMessage', async () => {
        const transactionId = await sendEncryptedTextMessage(service)(
            '[E2E] sendEncryptedTextMessage TEST (encrypted)',
            recipientId,
            recipientKeys.publicKey,
            senderKeys,
            1440,
            0.05
        );

        expect(transactionId).not.toBeUndefined();

    });

    it('should get a transaction from BRS with encrypted message and decrypt successfully', async () => {
        const transaction = await getTransaction(service)(environment.testEncryptedMessageTransactionId);
        expect(transaction).not.toBeUndefined();
        assertAttachmentVersion(transaction, 'EncryptedMessage');
        const {encryptedMessage} = transaction.attachment;

        const recipientsMessage = decryptMessage(encryptedMessage, transaction.senderPublicKey, recipientKeys.agreementPrivateKey);
        const sendersMessage = decryptMessage(encryptedMessage, recipientKeys.publicKey, senderKeys.agreementPrivateKey);
        expect(recipientsMessage).toEqual('[E2E] sendEncryptedTextMessage TEST (encrypted)');
        expect(recipientsMessage).toEqual(sendersMessage);

    });



});
