import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EncryptedMessage, Message, Account } from '@burstjs/core';
import { StoreService } from 'app/store/store.service';

type TransactionDetailsCellValue = string | Message | EncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

@Component({
  selector: 'app-transaction-details-dialog',
  templateUrl: './transaction-details-dialog.component.html',
  styleUrls: ['./transaction-details-dialog.component.css']
})
export class TransactionDetailsDialogComponent implements OnInit {

  infoColumns = ['key', 'value'];
  infoRows = ['transactionType', 'attachment', 'amountNQT', 'feeNQT', 'senderAddress', 'recipientAddress'];
  infoData: Map<string, TransactionDetailsCellValue>;
  detailsData: Map<string, TransactionDetailsCellValue>;
  account: Account;

  constructor(
    public dialogRef: MatDialogRef<TransactionDetailsDialogComponent>,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data) { 
      
      this.storeService.getSelectedAccount()
        .then((account) => {
            this.account = account;
            data.transaction.transactionType = this.getTransactionNameFromType(this.data.transaction, this.account);
            const transactionDetails = Object.keys(data.transaction).map((key:string): TransactionDetailsCellValueMap => [ key, data.transaction[key]]);
            this.detailsData = new Map(transactionDetails);
            this.infoData = new Map(transactionDetails.filter((row) => this.infoRows.indexOf(row[0]) > -1));
        });
  }

  getTransactionNameFromType(arg1, arg2) {
    return `coming soon`;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  public getInfoData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.infoData.entries());
  } 

  public getDetailsData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.detailsData.entries());
  } 

  ngOnInit() {
     
  }

}
