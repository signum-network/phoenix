/**
 * MultioutRecipientAmount interface
 * @see [[getRecipientAmountsFromMultiOutPayment]]
 * @module core
 */
export interface MultioutRecipientAmount {
    readonly recipient: string;
    readonly amountNQT: string;
}
