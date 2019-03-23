/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Constants for escrow subtypes
 *
 */
export class TransactionEscrowSubtype {
    public static readonly EscrowCreation = 0;
    public static readonly EscrowSigning = 1;
    public static readonly EscrowResult = 2;
    public static readonly SubscriptionSubscribe = 3;
    public static readonly SubscriptionCancel = 4;
    public static readonly SubscriptionPayment = 5;
}

