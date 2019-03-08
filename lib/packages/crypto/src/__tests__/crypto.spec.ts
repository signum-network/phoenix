import {generateMasterKeys} from '../generateMasterKeys';
import {getAccountIdFromPublicKey} from '../getAccountIdFromPublicKey';

describe('Crypto', () => {

    it('getAccountIdFromPublicKey successfully', () => {
        const keys = generateMasterKeys('weather state leave always grace arrow eventually loss fact ring desperate hey');
        const accountId = getAccountIdFromPublicKey(keys.publicKey);
        expect(accountId).toBe('6502115112683865257');
    });

});
