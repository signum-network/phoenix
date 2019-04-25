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
const FeeQuantNQT = 73500;

export {
    FeeQuantNQT,
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
