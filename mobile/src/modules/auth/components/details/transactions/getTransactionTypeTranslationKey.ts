import {
  TransactionType,
  TransactionPaymentSubtype,
  TransactionArbitrarySubtype,
  TransactionAssetSubtype,
  TransactionLeasingSubtype,
  TransactionMarketplaceSubtype,
  TransactionEscrowSubtype,
  TransactionSmartContractSubtype,
  TransactionMiningSubtype,
} from "@signumjs/core";

function getKeyForPaymentSubtype(subtype: number): string {
  switch (subtype) {
    case TransactionPaymentSubtype.Ordinary:
      return "single_payment";
    case TransactionPaymentSubtype.MultiOut:
      return "multi_out_payment";
    case TransactionPaymentSubtype.MultiOutSameAmount:
      return "multi_out_payment";
  }
  return "unknown";
}

function getKeyForArbitrarySubtype(subtype: number): string {
  switch (subtype) {
    case TransactionArbitrarySubtype.Message:
      return "message";
    case TransactionArbitrarySubtype.AliasAssignment:
      return "alias_assignment";
    case TransactionArbitrarySubtype.PollCreation:
      return "poll_creation";
    case TransactionArbitrarySubtype.VoteCasting:
      return "vote_casting";
    case TransactionArbitrarySubtype.HubAnnouncement:
      return "hub_announcements";
    case TransactionArbitrarySubtype.AccountInfo:
      return "account_info";
    case TransactionArbitrarySubtype.AliasSale:
      return "alias_sale_or_transfer";
    case TransactionArbitrarySubtype.AliasBuy:
      return "alias_buy";
  }
  return "unknown";
}

function getKeyForAssetSubtype(subtype: number): string {
  switch (subtype) {
    case TransactionAssetSubtype.AssetIssuance:
      return "asset_issuance";
    case TransactionAssetSubtype.AssetTransfer:
      return "asset_transfer";
    case TransactionAssetSubtype.AskOrderPlacement:
      return "ask_order_placement";
    case TransactionAssetSubtype.BidOrderPlacement:
      return "bid_order_placement";
    case TransactionAssetSubtype.AskOrderCancellation:
      return "ask_order_cancellation";
    case TransactionAssetSubtype.BidOrderCancellation:
      return "bid_order_cancellation";
  }
  return "unknown";
}

function getKeyForMarketplaceSubtype(subtype: number): string {
  switch (subtype) {
    case TransactionMarketplaceSubtype.MarketplaceListing:
      return "marketplace_listing";
    case TransactionMarketplaceSubtype.MarketplaceRemoval:
      return "marketplace_removal";
    case TransactionMarketplaceSubtype.MarketplaceItemPriceChange:
      return "marketplace_price_change";
    case TransactionMarketplaceSubtype.MarketplaceItemQuantityChange:
      return "marketplace_quantity_change";
    case TransactionMarketplaceSubtype.MarketplacePurchase:
      return "marketplace_purchase";
    case TransactionMarketplaceSubtype.MarketplaceDelivery:
      return "marketplace_delivery";
    case TransactionMarketplaceSubtype.MarketplaceFeedback:
      return "marketplace_feedback";
    case TransactionMarketplaceSubtype.MarketplaceRefund:
      return "marketplace_refund";
  }
  return "unknown";
}

function getKeyForLeasingSubtype(subtype: number): string {
  switch (subtype) {
    case TransactionLeasingSubtype.Ordinary:
      return "balance_leasing";
  }
  return "unknown";
}

function getKeyForMiningSubtype(subtype: number): string {
  switch (subtype) {
    case TransactionMiningSubtype.RewardRecipientAssignment:
      return "reward_recipient_assignment";
    case TransactionMiningSubtype.AddCommitment:
      return "add_commitment";
    case TransactionMiningSubtype.RemoveCommitment:
      return "revoke_commitment";
  }
  return "unknown";
}

function getKeyForEscrowSubtype(subtype: number): string {
  switch (subtype) {
    case TransactionEscrowSubtype.EscrowCreation:
      return "escrow_creation";
    case TransactionEscrowSubtype.EscrowSigning:
      return "escrow_signing";
    case TransactionEscrowSubtype.EscrowResult:
      return "escrow_result";
    case TransactionEscrowSubtype.SubscriptionSubscribe:
      return "subscription_subscribe";
    case TransactionEscrowSubtype.SubscriptionCancel:
      return "subscription_cancel";
    case TransactionEscrowSubtype.SubscriptionPayment:
      return "subscription_payment";
  }
  return "unknown";
}

function getKeyForATSubtype(subtype: number): string {
  switch (subtype) {
    case TransactionSmartContractSubtype.SmartContractCreation:
      return "smart_contract_creation";
    case TransactionSmartContractSubtype.SmartContractPayment:
      return "smart_contract_payment";
  }
  return "unknown";
}

export function getTransactionTypeTranslationKey(type: number): string {
  switch (type) {
    case TransactionType.Payment:
      return "payment";
    case TransactionType.Arbitrary:
      return "arbitrary_message";
    case TransactionType.Asset:
      return "asset";
    case TransactionType.Marketplace:
      return "marketplace";
    case TransactionType.Leasing:
      return "leasing";
    case TransactionType.Mining:
      return "mining";
    case TransactionType.Escrow:
      return "escrow";
    case TransactionType.AT:
      return "smart_contract";
    default:
      return "unknown";
  }
}

export function getTransactionSubtypeTranslationKey(
  type: number,
  subtype: number
): string {
  let translationKey;

  switch (type) {
    case TransactionType.Payment:
      translationKey = getKeyForPaymentSubtype(subtype);
      break;
    case TransactionType.Arbitrary:
      translationKey = getKeyForArbitrarySubtype(subtype);
      break;
    case TransactionType.Asset:
      translationKey = getKeyForAssetSubtype(subtype);
      break;
    case TransactionType.Marketplace:
      translationKey = getKeyForMarketplaceSubtype(subtype);
      break;
    case TransactionType.Leasing:
      translationKey = getKeyForLeasingSubtype(subtype);
      break;
    case TransactionType.Mining:
      translationKey = getKeyForMiningSubtype(subtype);
      break;
    case TransactionType.Escrow:
      translationKey = getKeyForEscrowSubtype(subtype);
      break;
    case TransactionType.AT:
      translationKey = getKeyForATSubtype(subtype);
      break;
  }

  return translationKey || "unknown";
}
