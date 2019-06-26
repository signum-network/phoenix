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
const FeeQuantNQT = 735000;

/**
 * The default deadline (in minutes) for Transactions
 */
const DefaultDeadline = 1440;

export {
    FeeQuantNQT,
    DefaultDeadline,
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
