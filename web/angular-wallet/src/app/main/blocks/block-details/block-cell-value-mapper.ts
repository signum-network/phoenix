import {
  Block
} from '@burstjs/core';


export enum BlockCellValueType {
  AccountAddress = 'AccountAddress',
  AccountId = 'AccountId',
  AccountInfo = 'AccountInfo',
  Asset = 'Asset',
  BlockId = 'BlockId',
  Date = 'Date',
  Default = 'Default',
  EncryptedMessage = 'EncryptedMessage',
  Message = 'Message',
  MultiSameOutCreation = 'MultiSameOutCreation',
  MultiOutCreation = 'MultiOutCreation',
}

export class BlockCellValue {
  constructor(public data: any, public type: BlockCellValueType = BlockCellValueType.Default) {
  }
}

export class BlockCellValueMapper {

  private map: object;

  constructor(
    private block: Block,
  ) {
    this.initializeMap();
  }

  public getValue(key: string): BlockCellValue {
    return this.map[key] || {
      data: this.block[key],
      type: BlockCellValueType.Default
    };
  }

  private initializeMap(): void {
    this.map = {
      // type: this.getTransactionType(),
      // subtype: this.getTransactionSubtype(),
      // attachment: this.getAttachment(),
      // feeNQT: this.getAmount(this.block.feeNQT),
      // amountNQT: this.getAmount(this.block.amountNQT),
      // senderRS: this.getTypedValue(this.block.senderRS, BlockCellValueType.AccountAddress),
      // sender: this.getTypedValue(this.block.sender, BlockCellValueType.AccountId),
      // recipientRS: this.getTypedValue(this.block.recipientRS, BlockCellValueType.AccountAddress),
      // recipient: this.getTypedValue(this.block.recipient, BlockCellValueType.AccountId),
      // block: this.getTypedValue(this.block.block, BlockCellValueType.BlockId),
      // blockTimestamp: this.getTime(this.block.blockTimestamp),
      // ecBlockId: this.getTypedValue(this.block.ecBlockId, BlockCellValueType.BlockId),
      // timestamp: this.getTime(this.block.timestamp),
    };
  }
}
