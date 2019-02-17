import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EncryptedMessage, Message, Account, Transaction } from '@burstjs/core';
import { StoreService } from 'app/store/store.service';
import { ActivatedRoute } from '@angular/router';

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
  transaction: Transaction

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute) { 
  }

  getTransactionNameFromType(arg1, arg2) {
    return `coming soon`;
  }

  closeDialog(): void {
  }

  public getInfoData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.infoData.entries());
  } 

  public getDetailsData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.detailsData.entries());
  } 

  ngOnInit() {
    this.transaction = this.route.snapshot.data.transaction as Transaction;
    const transactionDetails = Object.keys(this.transaction).map((key:string): TransactionDetailsCellValueMap => [ key, this.transaction[key]]);
    this.detailsData = new Map(transactionDetails);
    this.infoData = new Map(transactionDetails.filter((row) => this.infoRows.indexOf(row[0]) > -1));
      
    this.storeService.getSelectedAccount()
      .then((account) => {
          this.account = account;
          // @ts-ignore
          this.transaction.transactionType = this.getTransactionNameFromType(this.transaction, this.account);
      });
  }

}
