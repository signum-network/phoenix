import {
  assertAttachmentVersion,
  Account,
  Transaction,
  TransactionSmartContractSubtype,
  TransactionType
} from '@burstjs/core';
import {UtilService} from '../../../util.service';
import {convertBurstTimeToDate, convertHexStringToString, convertNQTStringToNumber} from '@burstjs/util';


export enum CellValueType {
  AccountAddress = 'AccountAddress',
  AccountId = 'AccountId',
  Asset = 'Asset',
  BlockId = 'BlockId',
  Date = 'Date',
  Default = 'Default',
  EncryptedMessage = 'EncryptedMessage'
}

export class CellValue {
  constructor(public data: any, public type: CellValueType = CellValueType.Default) {
  }
}

export class CellValueMapper {

  private map: object;

  constructor(
    private transaction: Transaction,
    private account: Account,
    private utilService: UtilService,
  ) {
    this.initializeMap();
  }

  public getValue(key: string): CellValue {
    return this.map[key] || {
      data: this.transaction[key],
      type: CellValueType.Default
    };
  }

  private initializeMap(): void {
    this.map = {
      type: this.getTransactionType(),
      subtype: this.getTransactionSubtype(),
      attachment: this.getAttachment(),
      feeNQT: this.getAmount(this.transaction.feeNQT),
      amountNQT: this.getAmount(this.transaction.amountNQT),
      senderRS: this.getTypedValue(this.transaction.senderRS, CellValueType.AccountAddress),
      sender: this.getTypedValue(this.transaction.sender, CellValueType.AccountId),
      recipientRS: this.getTypedValue(this.transaction.recipientRS, CellValueType.AccountAddress),
      recipient: this.getTypedValue(this.transaction.recipient, CellValueType.AccountId),
      block: this.getTypedValue(this.transaction.block, CellValueType.BlockId),
      blockTimestamp: this.getTime(this.transaction.blockTimestamp),
      ecBlockId: this.getTypedValue(this.transaction.ecBlockId, CellValueType.BlockId),
      timestamp: this.getTime(this.transaction.timestamp),
    };
  }

  private getTransactionType(): CellValue {
    return new CellValue(this.utilService.translateTransactionType(this.transaction));
  }

  private getTransactionSubtype(): CellValue {
    return new CellValue(this.utilService.translateTransactionSubtype(this.transaction, this.account));
  }

  private getAttachment(): CellValue {
    if (this.transaction.type === TransactionType.AT &&
      this.transaction.subtype === TransactionSmartContractSubtype.SmartContractPayment) {
      try {
        assertAttachmentVersion(this.transaction, 'Message');
        return new CellValue(convertHexStringToString(this.transaction.attachment.message.replace(/00/g, '')));
      } catch (e) {
        // ignore
      }
    }

    // more mappings

    return this.transaction['attachment'];
  }

  private getAmount(nqt: string): CellValue {
    const valueStr = `${convertNQTStringToNumber(nqt)} BURST`;
    return new CellValue(valueStr);
  }

  private getTypedValue(value: string, type: CellValueType): CellValue {
    return new CellValue(value, type);
  }

  private getTime(blockTimestamp: number): CellValue {
    const date = convertBurstTimeToDate(blockTimestamp);
    return new CellValue(date, CellValueType.Date);
  }
}
