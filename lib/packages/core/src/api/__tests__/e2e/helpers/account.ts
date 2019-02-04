import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';

export const getAccountIdFromPassphrase = (passphrase: string): string => {
    const {publicKey} = generateMasterKeys(passphrase);
    return getAccountIdFromPublicKey(publicKey);
}

