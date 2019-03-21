/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Constants for transaction types
 *
 * The transaction type is part of every [[Transaction]] object
 * and used to distinguish block data. Additionally, to the transaction type
 * a subtype is sent, that specifies the kind of transaction more detailly.
 */
export class TransactionType {
    /**
     * @see TransactionPaymentSubtype
     */
    public static readonly Payment = 0;
    /**
     * @see TransactionArbitrarySubtype
     */
    public static readonly Arbitrary = 1;
    /**
     * @see TransactionAssetSubtype
     */
    public static readonly Asset = 2;
    /**
     * @see TransactionMarketplaceSubtype
     */
    public static readonly Marketplace = 3;
    /**
     * @see TransactionLeasingSubtype
     */
    public static readonly Leasing = 4;
}

