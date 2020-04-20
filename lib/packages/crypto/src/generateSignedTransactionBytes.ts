/**
 * Generates a signed message digest, which can be sent to BRS API then
 * @param unsignedTransactionHex The unsigned message
 * @param signature The signature
 * @return The signed message digest
 * @module crypto
 */
export const generateSignedTransactionBytes = (unsignedTransactionHex: string, signature: string): string =>
    unsignedTransactionHex.substr(0, 192) + signature + unsignedTransactionHex.substr(320);

