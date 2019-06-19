import {
  assertAttachmentVersion,
  Account,
  Transaction,
  TransactionSmartContractSubtype,
  TransactionType
} from '@burstjs/core';
import {UtilService} from '../../../util.service';
import {convertHexStringToString} from '@burstjs/util';


export enum CellValueType {
  TEST
}

export interface CellValue {
  data: any;
  type: CellValueType;
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
      type: CellValueType.TEST
    };
  }

  private initializeMap(): void {
    this.map = {
      type: {
        data: this.utilService.translateTransactionType(this.transaction),
      },
      subtype: {
        data: this.utilService.translateTransactionSubtype(this.transaction, this.account)
      },
      attachment: {
        data: this.getAttachmentValue()
      }
      // add more mappings here
    };
  }

  private getAttachmentValue(): string {
    if (this.transaction.type === TransactionType.AT &&
      this.transaction.subtype === TransactionSmartContractSubtype.SmartContractPayment) {
      try {
        assertAttachmentVersion(this.transaction, 'Message');
        return convertHexStringToString(this.transaction.attachment.message.replace(/00/g, ''));
      } catch (e) {
        // ignore
      }
    }

    // more mappings

    return this.transaction['attachment'];
  }

}
