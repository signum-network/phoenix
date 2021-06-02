import {generateMasterKeys, getAccountIdFromPublicKey} from '@signumjs/crypto';

export const getAccountIdFromPassphrase = (passphrase: string): string => {
    const {publicKey} = generateMasterKeys(passphrase);
    return getAccountIdFromPublicKey(publicKey);
};

