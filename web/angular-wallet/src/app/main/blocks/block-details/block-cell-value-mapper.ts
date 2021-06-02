import {Block} from '@signumjs/core';
import {BlockTime} from '@signumjs/util';
import {CellValue, CellValueType} from '../../transactions/transaction-details/cell-value-mapper';
import {formatAmount} from '../../../util/formatAmount';
import {Amount} from '@signumjs/util';


export enum BlockCellValueType {
  AccountAddress = 'AccountAddress',
  AccountId = 'AccountId',
  BlockId = 'BlockId',
  Date = 'Date',
  Default = 'Default',
  Transactions = 'Transactions',
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
      nextBlock: this.getTypedValue(this.block.nextBlock, BlockCellValueType.BlockId),
      previousBlock: this.getTypedValue(this.block.previousBlock, BlockCellValueType.BlockId),
      blockReward: this.getAmount(this.block.blockReward, false),
      generatorRS: this.getTypedValue(this.block.generatorRS, BlockCellValueType.AccountAddress),
      generator: this.getTypedValue(this.block.generator, BlockCellValueType.AccountId),
      totalFeeNQT: this.getAmount(this.block.totalFeeNQT),
      totalAmountNQT: this.getAmount(this.block.totalAmountNQT),
      timestamp: this.getTime(this.block.timestamp),
      transactions: this.getTypedValue(this.block.transactions, BlockCellValueType.Transactions)
    };
  }

  private getTime(blockTimestamp: number): CellValue {
    const date = BlockTime.fromBlockTimestamp(blockTimestamp).getDate();
    return new CellValue(date, CellValueType.Date);
  }

  private getAmount(value: string, isPlanck = true): BlockCellValue {
    const amount = isPlanck ? Amount.fromPlanck(value) : Amount.fromSigna(value);
    const valueStr = `${formatAmount(amount.getSigna())}`;
    return new BlockCellValue(valueStr);
  }

  private getTypedValue(value: any, valueType: BlockCellValueType): BlockCellValue {
    return new BlockCellValue(value, valueType);
  }
}
