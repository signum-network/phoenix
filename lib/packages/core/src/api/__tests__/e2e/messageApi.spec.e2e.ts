import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../burstService';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {sendTextMessage} from '../..';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Message Api', () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiPath);

    it('should sendTextMessage', async () => {
        const keys = generateMasterKeys(environment.testPassphrase);

        const transactionId = await sendTextMessage(service)(
            '[E2E] sendTextMessage TEST',
            environment.testRecipientId,
            keys.publicKey,
            keys.signPrivateKey,
            0.05
        );

        expect(transactionId).not.toBeUndefined();

    });
});
