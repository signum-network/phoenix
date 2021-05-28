import {TransactionType} from './transactionType';
import {TransactionArbitrarySubtype} from './transactionArbitrarySubtype';
import {TransactionAssetSubtype} from './transactionAssetSubtype';
import {TransactionLeasingSubtype} from './transactionLeasingSubtype';
import {TransactionMarketplaceSubtype} from './transactionMarketplaceSubtype';
import {TransactionPaymentSubtype} from './transactionPaymentSubtype';
import {TransactionMiningSubtype} from './transactionMiningSubtype';
import {TransactionEscrowSubtype} from './transactionEscrowSubtype';
import {TransactionSmartContractSubtype} from './transactionSmartContractSubtype';

/**
 * The default deadline (in minutes) for Transactions
 * @module core
 */
const DefaultDeadline = 1440;

/**
 * The default endpoint for [[ApiSettings]]
 * @module core
 */
const DefaultApiEndpoint = '/burst';


/**
 *
 * Address prefixes used in [[Address]]
 * @module core
 * */
enum AddressPrefix {
    MainNet = 'S',
    TestNet = 'TS',
}


export {
    AddressPrefix,
    DefaultDeadline,
    DefaultApiEndpoint,
    TransactionType,
    TransactionPaymentSubtype,
    TransactionMarketplaceSubtype,
    TransactionLeasingSubtype,
    TransactionAssetSubtype,
    TransactionArbitrarySubtype,
    TransactionMiningSubtype,
    TransactionEscrowSubtype,
    TransactionSmartContractSubtype
};
