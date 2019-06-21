const keyMap = {
  baseTarget: 'base_target',
  block: 'block',
  blockReward: 'block_reward',
  blockSignature: 'block_signature',
  generator: 'generator_id',
  generatorRS: 'generator_address',
  generationSignature: 'generation_signature',
  generatorPublicKey: 'generator_public_key',
  height: 'height',
  nextBlock: 'next_block',
  nonce: 'nonce',
  numberOfTransactions: 'number_transactions',
  payloadHash: 'payload_hash',
  payloadLength: 'payload_length',
  previousBlock: 'previous_block',
  previousBlockHash: 'previous_block_hash',
  requestProcessingTime: 'request_processing_time',
  scoopNum: 'scoop_num',
  timestamp: 'timestamp',
  totalAmountNQT: 'total_amount',
  totalFeeNQT: 'total_fee',
  transactions: 'transactions',
  version: 'version'
};

export function getBlockFieldTranslationKey(key: string): string {
  return keyMap[key] || key;
}
