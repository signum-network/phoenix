import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {
  EncryptedMessage,
  Message,
  Account,
  Transaction,
  TransactionType,
  TransactionSmartContractSubtype, assertAttachmentVersion
} from '@burstjs/core';
import {StoreService} from 'app/store/store.service';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../../../util.service';
import {AccountService} from 'app/setup/account/account.service';
import {convertHexStringToString} from '@burstjs/util';

type TransactionDetailsCellValue = string | Message | EncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  infoColumns = ['key', 'value'];
  infoRows = ['transactionType', 'attachment', 'amountNQT', 'feeNQT', 'senderAddress', 'recipientAddress'];
  infoData: Map<string, TransactionDetailsCellValue>;
  detailsData: Map<string, TransactionDetailsCellValue>;
  account: Account;
  transaction: Transaction;
  recipient: Account;

  constructor(
    private storeService: StoreService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private accountService: AccountService) {
  }

  private getNameFromTransactionSubtype(): string {
    return this.utilService.translateTransactionSubtype(this.transaction, this.account);
  }

  private getNameFromTransactionType(): string {
    return this.utilService.translateTransactionType(this.transaction);
  }

  closeDialog(): void {
  }

  public getInfoData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.infoData.entries());
  }

  public getDetailsData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.detailsData.entries());
  }

  private mapCellValue(key: string): TransactionDetailsCellValueMap {
    let value;
    switch (key) {
      case 'type':
        value = this.getNameFromTransactionType();
        break;
      case 'subtype':
        value = this.getNameFromTransactionSubtype();
        break;
      case 'attachment':
        value = this.getAttachmentValue(key);
        break;
      default:
        value = this.transaction[key];
    }

    return [key, value];
  }


  trackRows(index, row): any {
    return row ? row.id : undefined;
  }

  async ngOnInit(): Promise<void> {
    this.transaction = this.route.snapshot.data.transaction as Transaction;
    const transactionDetails = Object
      .keys(this.transaction)
      .map(key => this.mapCellValue(key));
    this.detailsData = new Map(transactionDetails);
    this.infoData = new Map(transactionDetails.filter((row) => this.infoRows.indexOf(row[0]) > -1));
    try {
      this.recipient = await this.accountService.getAccount(this.transaction.recipient);
    } catch (e) {
    }

    this.storeService.getSelectedAccount()
      .then((account) => {
        this.account = account;
        // @ts-ignore
        this.transaction.transactionType = this.getNameFromTransactionSubtype(this.transaction, this.account);
      });
  }

  currentAccountIsSender(): boolean {
    return this.account && this.transaction.senderRS === this.account.accountRS;
  }

  private getAttachmentValue(key: string): string {
    if (this.transaction.type === TransactionType.AT &&
      this.transaction.subtype === TransactionSmartContractSubtype.SmartContractPayment) {
      try {
        assertAttachmentVersion(this.transaction, 'Message');
        return convertHexStringToString(this.transaction.attachment.message.replace(/00/g, ''));
      } catch (e) {
        // ignore
      }
    }
    return this.transaction[key];
  }
}
