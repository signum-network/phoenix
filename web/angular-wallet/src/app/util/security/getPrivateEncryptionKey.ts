import {decryptAES, hashSHA256, Keys} from '@signumjs/crypto';
import {KeyDecryptionException} from '../exceptions/KeyDecryptionException';

export function getPrivateEncryptionKey(pin: string, keys: Keys): string {
  const privateKey = decryptAES(keys.agreementPrivateKey, hashSHA256(pin));
  if (!privateKey) {
    throw new KeyDecryptionException();
  }
  return privateKey;
}
