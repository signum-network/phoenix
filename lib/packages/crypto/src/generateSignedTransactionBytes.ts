/**
 * Generates a signed message digest
 * @param unsignedTransactionHex The unsigned message
 * @param signature The signature
 * @return The signed message digest
 */
export const generateSignedTransactionBytes = (unsignedTransactionHex: string, signature: string): string =>
    unsignedTransactionHex.substr(0, 192) + signature + unsignedTransactionHex.substr(320);

