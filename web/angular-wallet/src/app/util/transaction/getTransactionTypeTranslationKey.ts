import {
  Transaction,
  Account,
  TransactionType,
  TransactionPaymentSubtype,
  TransactionArbitrarySubtype,
  TransactionAssetSubtype,
  TransactionLeasingSubtype,
  TransactionMarketplaceSubtype,
  TransactionEscrowSubtype,
  TransactionSmartContractSubtype,
  TransactionMiningSubtype,
} from '@signumjs/core';

function getKeyForPaymentSubtype(transaction: Transaction): string {
  switch (transaction.subtype) {
    case TransactionPaymentSubtype.Ordinary:
      return 'ordinary_payment';
    case TransactionPaymentSubtype.MultiOut:
      return 'multi_out_payment';
    case TransactionPaymentSubtype.MultiOutSameAmount:
      return 'multi_out_payment';
  }
}

function getKeyForArbitrarySubtype(account: Account, transaction: Transaction): string {

  switch (transaction.subtype) {
    case TransactionArbitrarySubtype.Message:
      return 'arbitrary_message';
    case TransactionArbitrarySubtype.AliasAssignment:
      return 'alias_assignment';
    case TransactionArbitrarySubtype.PollCreation:
      return 'poll_creation';
    case TransactionArbitrarySubtype.VoteCasting:
      return 'vote_casting';
    case TransactionArbitrarySubtype.HubAnnouncement:
      return 'hub_announcements';
    case TransactionArbitrarySubtype.AccountInfo:
      return 'account_info';
    case TransactionArbitrarySubtype.AliasSale:

      if (transaction.attachment.priceNQT !== '0') {
        return 'alias_sale';
      }

      return (account
        && (transaction.sender === account.account)
        && (transaction.recipient === account.account)) ? 'alias_sale_cancellation' : 'alias_transfer';

    case TransactionArbitrarySubtype.AliasBuy:
      return 'alias_buy';
  }

}

function getKeyForAssetSubtype(transaction: Transaction): string {
  switch (transaction.subtype) {
    case TransactionAssetSubtype.AssetIssuance:
      return 'asset_issuance';
    case TransactionAssetSubtype.AssetTransfer:
      return 'asset_transfer';
    case TransactionAssetSubtype.AskOrderPlacement:
      return 'ask_order_placement';
    case TransactionAssetSubtype.BidOrderPlacement:
      return 'bid_order_placement';
    case TransactionAssetSubtype.AskOrderCancellation:
      return 'ask_order_cancellation';
    case TransactionAssetSubtype.BidOrderCancellation:
      return 'bid_order_cancellation';
    case TransactionAssetSubtype.AssetDistributeToHolders:
      return 'distribution_tokenholders';
    case TransactionAssetSubtype.AssetMint:
      return 'mint_token';
    case TransactionAssetSubtype.AssetAddTreasureyAccount:
      return 'add_treasury_account';
  }
}

function getKeyForMarketplaceSubtype(transaction: Transaction): string {
  switch (transaction.subtype) {
    case TransactionMarketplaceSubtype.MarketplaceListing:
      return 'marketplace_listing';
    case TransactionMarketplaceSubtype.MarketplaceRemoval:
      return 'marketplace_removal';
    case TransactionMarketplaceSubtype.MarketplaceItemPriceChange:
      return 'marketplace_price_change';
    case TransactionMarketplaceSubtype.MarketplaceItemQuantityChange:
      return 'marketplace_quantity_change';
    case TransactionMarketplaceSubtype.MarketplacePurchase:
      return 'marketplace_purchase';
    case TransactionMarketplaceSubtype.MarketplaceDelivery:
      return 'marketplace_delivery';
    case TransactionMarketplaceSubtype.MarketplaceFeedback:
      return 'marketplace_feedback';
    case TransactionMarketplaceSubtype.MarketplaceRefund:
      return 'marketplace_refund';
  }
}

function getKeyForLeasingSubtype(transaction: Transaction): string {
  switch (transaction.subtype) {
    case TransactionLeasingSubtype.Ordinary:
      return 'balance_leasing';
  }
}

function getKeyForMiningSubtype(transaction: Transaction): string {
  switch (transaction.subtype) {
    case TransactionMiningSubtype.RewardRecipientAssignment:
      return 'reward_recipient_assignment';
    case TransactionMiningSubtype.AddCommitment:
      return 'add_commitment';
    case TransactionMiningSubtype.RemoveCommitment:
      return 'revoke_commitment';
  }
}

// FIXME: complete the translations
function getKeyForEscrowSubtype(transaction: Transaction): string {
  switch (transaction.subtype) {
    case TransactionEscrowSubtype.EscrowCreation:
      return 'Escrow Creation';
    case TransactionEscrowSubtype.EscrowSigning:
      return 'Escrow Signing';
    case TransactionEscrowSubtype.EscrowResult:
      return 'Escrow Result';
    case TransactionEscrowSubtype.SubscriptionSubscribe:
      return 'Subscription Subscribe';
    case TransactionEscrowSubtype.SubscriptionCancel:
      return 'Subscription Cancel';
    case TransactionEscrowSubtype.SubscriptionPayment:
      return 'Subscription Payment';
  }
}

function getKeyForATSubtype(transaction: Transaction): string {
  switch (transaction.subtype) {
    case TransactionSmartContractSubtype.SmartContractCreation:
      return 'smart_contract_creation';
    case TransactionSmartContractSubtype.SmartContractPayment:
      return 'smart_contract_payment';
  }
}

export function getTransactionTypeTranslationKey(transaction: Transaction): string {
  switch (transaction.type) {
    case TransactionType.Payment:
      return 'payment';
    case TransactionType.Arbitrary:
      return 'arbitrary_message';
    case TransactionType.Asset:
      return 'asset';
    case TransactionType.Marketplace:
      return 'marketplace';
    case TransactionType.Leasing:
      return 'leasing';
    case TransactionType.Mining:
      return 'mining';
    case TransactionType.Escrow:
      return 'escrow';
    case TransactionType.AT:
      return 'smart_contract';
    default:
      return 'unknown';
  }
}


export function getTransactionSubtypeTranslationKey(transaction: Transaction, account: Account): string {
  let translationKey;

  switch (transaction.type) {
    case TransactionType.Payment:
      translationKey = getKeyForPaymentSubtype(transaction);
      break;
    case TransactionType.Arbitrary:
      translationKey = getKeyForArbitrarySubtype(account, transaction);
      break;
    case TransactionType.Asset:
      translationKey = getKeyForAssetSubtype(transaction);
      break;
    case TransactionType.Marketplace:
      translationKey = getKeyForMarketplaceSubtype(transaction);
      break;
    case TransactionType.Leasing:
      translationKey = getKeyForLeasingSubtype(transaction);
      break;
    case TransactionType.Mining:
      translationKey = getKeyForMiningSubtype(transaction);
      break;
    case TransactionType.Escrow:
      translationKey = getKeyForEscrowSubtype(transaction);
      break;
    case TransactionType.AT:
      translationKey = getKeyForATSubtype(transaction);
      break;
  }

  return translationKey || 'unknown';
}
