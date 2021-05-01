export class KeyDecryptionException extends Error {
  constructor() {
    super('Could not decrypt the key');
  }
}


