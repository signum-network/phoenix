export function isKeyDecryptionError(e): boolean {
  return e.message === 'Could not decrypt the key';
}
