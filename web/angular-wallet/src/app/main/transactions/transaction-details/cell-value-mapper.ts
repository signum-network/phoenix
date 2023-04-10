import {
  Account,
  Transaction,
  TransactionSmartContractSubtype,
  TransactionType,
  getAttachmentVersion, TransactionAssetSubtype
} from "@signumjs/core";
import {UtilService} from '../../../util.service';
import {Amount, ChainTime, convertHexStringToString} from '@signumjs/util';
import { WalletAccount } from 'app/util/WalletAccount';


export enum CellValueType {
  AccountAddress = 'AccountAddress',
  AccountId = 'AccountId',
  AccountInfo = 'AccountInfo',
  Asset = 'Asset',
  AssetTransfer = 'AssetTransfer',
  AssetMultiTransfer = 'AssetMultiTransfer',
  BlockId = 'BlockId',
  Date = 'Date',
  ReferenceHash = 'ReferenceHash',
  Default = 'Default',
  Distribution = 'Distribution',
  EncryptedMessage = 'EncryptedMessage',
  Message = 'Message',
  MultiSameOutCreation = 'MultiSameOutCreation',
  MultiOutCreation = 'MultiOutCreation',
  CommitmentAdd = 'CommitmentAdd',
  CommitmentRemove = 'CommitmentRemove',
  AssetDistributeToHolders = 'AssetDistributeToHolders',
  AssetTransferOwnershipReference = 'AssetTransferOwnershipReference'
}

export class CellValue {
  constructor(public data: any, public type: CellValueType = CellValueType.Default) {
  }
}

export class CellValueMapper {

  private map: object;

  constructor(
    private transaction: Transaction,
    private account: WalletAccount,
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
      attachment: this.getTypedAttachment(),
      referencedTransactionFullHash: this.transaction.referencedTransactionFullHash
        ? this.getTypedValue(this.transaction.referencedTransactionFullHash, CellValueType.ReferenceHash)
        : null,
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
      cashBackId: this.getTypedValue(this.transaction.cashBackId, CellValueType.AccountId),
    };
  }

  private getTransactionType(): CellValue {
    return new CellValue(this.utilService.translateTransactionType(this.transaction));
  }

  private getTransactionSubtype(): CellValue {
    return new CellValue(this.utilService.translateTransactionSubtype(this.transaction, this.account));
  }

  private getTypedAttachment(): CellValue {

    const {attachment} = this.transaction;

    const versionIdentifier = getAttachmentVersion(this.transaction);
    switch (versionIdentifier) {
      case 'AccountInfo':
        return new CellValue(attachment, CellValueType.AccountInfo);
      case 'EncryptedMessage':
        return new CellValue(attachment, CellValueType.EncryptedMessage);
      case 'Message':
        return this.getMessageAttachment(this.transaction);
      case 'Asset':
        return new CellValue(attachment, CellValueType.Asset);
      case 'AssetTransfer':
        return new CellValue(attachment, CellValueType.AssetTransfer);
      case 'AssetMultiTransfer':
        return new CellValue(attachment, CellValueType.AssetMultiTransfer);
      case 'MultiSameOutCreation':
        return new CellValue(attachment, CellValueType.MultiSameOutCreation);
      case 'MultiOutCreation':
        return new CellValue(attachment, CellValueType.MultiOutCreation);
      case 'CommitmentAdd':
        return new CellValue(attachment, CellValueType.CommitmentAdd);
      case 'CommitmentRemove':
        return new CellValue(attachment, CellValueType.CommitmentRemove);
      case 'AssetDistributeToHolders':
        return new CellValue(attachment, CellValueType.AssetDistributeToHolders);
      default:
        return this.getGenericJSONAttachment(this.transaction);
    }

  }

  private getAmount(nqt: string): CellValue {
    const valueStr = Amount.fromPlanck(nqt).toString();
    return new CellValue(valueStr);
  }

  private getTypedValue(value: string, type: CellValueType): CellValue {
    return new CellValue(value, type);
  }

  private getTime(blockTimestamp: number): CellValue {
    const date = ChainTime.fromChainTimestamp(blockTimestamp).getDate();
    return new CellValue(date, CellValueType.Date);
  }

  private getMessageAttachment(transaction: Transaction): CellValue {
    const {type, subtype, attachment} = transaction;

    if(!attachment){
      return new CellValue('');
    }

    if (
      type === TransactionType.AT &&
      subtype === TransactionSmartContractSubtype.SmartContractPayment
    ) {
      return new CellValue(convertHexStringToString(attachment.message.replace(/00/g, '')));
    }

    return new CellValue(attachment.message);
  }

  private getGenericJSONAttachment(transaction: Transaction) : CellValue {
    const {attachment} = transaction;
    try {
        return new CellValue(JSON.stringify(attachment));
    }catch(e){
      return new CellValue('');
    }
  }
}
