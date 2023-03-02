const keyMap = {
  senderPublicKey: 'sender_public_key',
  signature: 'signature',
  feeNQT: 'fee_nqt',
  requestProcessingTime: 'request_processing_time',
  type: 'type',
  confirmations: 'confirmations',
  fullHash: 'full_hash',
  version: 'version',
  ecBlockId: 'ec_block_id',
  signatureHash: 'signature_hash',
  attachment: 'attachment',
  senderRS: 'sender_address',
  subtype: 'subtype',
  amountNQT: 'amount_nqt',
  sender: 'sender_id',
  ecBlockHeight: 'ec_block_height',
  block: 'block_id',
  blockTimestamp: 'block_timestamp',
  deadline: 'deadline',
  transaction: 'transaction_id',
  timestamp: 'timestamp',
  height: 'block_height',
  recipient: 'recipient_id',
  recipientRS: 'recipient_address',
  cashBackId: 'cashback_id',
  referencedTransactionFullHash: 'referenced_transaction_full_hash'
};

export function getTransactionFieldTranslationKey(key: string): string {
  return keyMap[key] || key;
}
