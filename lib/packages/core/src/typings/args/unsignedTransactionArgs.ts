
/**
 * The argument object for [[TransactionApi.signAndBroadcastTransaction]]
 *
 * @module core
 */
export interface UnsignedTransactionArgs {
    unsignedHexMessage: string;
    senderPrivateKey: string;
    senderPublicKey: string;
}
