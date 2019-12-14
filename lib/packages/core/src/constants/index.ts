/** @module core */

import {TransactionType} from './transactionType';
import {TransactionArbitrarySubtype} from './transactionArbitrarySubtype';
import {TransactionAssetSubtype} from './transactionAssetSubtype';
import {TransactionLeasingSubtype} from './transactionLeasingSubtype';
import {TransactionMarketplaceSubtype} from './transactionMarketplaceSubtype';
import {TransactionPaymentSubtype} from './transactionPaymentSubtype';
import {TransactionRewardRecipientSubtype} from './transactionRewardRecipientSubtype';
import {TransactionEscrowSubtype} from './transactionEscrowSubtype';
import {TransactionSmartContractSubtype} from './transactionSmartContractSubtype';

/**
 * The smallest possible fee
 */
const FeeQuantPlanck = 735000;
/**
 * The default deadline (in minutes) for Transactions
 */
const DefaultDeadline = 1440;

/**
 * The default endpoint for [[ApiSettings]]
 */
const DefaultApiEndpoint = '/burst';

export {
    FeeQuantPlanck,
    DefaultDeadline,
    DefaultApiEndpoint,
    TransactionType,
    TransactionPaymentSubtype,
    TransactionMarketplaceSubtype,
    TransactionLeasingSubtype,
    TransactionAssetSubtype,
    TransactionArbitrarySubtype,
    TransactionRewardRecipientSubtype,
    TransactionEscrowSubtype,
    TransactionSmartContractSubtype
};
