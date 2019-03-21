/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Constants for marketplace subtypes
 *
 */
export class TransactionMarketplaceSubtype {
    public static readonly MarketplaceListing = 0;
    public static readonly MarketplaceRemoval = 1;
    public static readonly MarketplaceItemPriceChange = 2;
    public static readonly MarketplaceItemQuantityChange = 3;
    public static readonly MarketplacePurchase = 4;
    public static readonly MarketplaceDelivery = 5;
    public static readonly MarketplaceFeedback = 6;
    public static readonly MarketplaceRefund = 7;
}

