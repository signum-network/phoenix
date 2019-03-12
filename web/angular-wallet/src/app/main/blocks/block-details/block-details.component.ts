import { Component, OnInit } from '@angular/core';
import { EncryptedMessage, Message, Account, Transaction, Block } from '@burstjs/core';
import { StoreService } from 'app/store/store.service';
import { ActivatedRoute } from '@angular/router';

type TransactionDetailsCellValue = string | Message | EncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {

  infoColumns = ['key', 'value'];
  infoRows = ['transactionType', 'attachment', 'amountNQT', 'feeNQT', 'senderAddress', 'recipientAddress'];
  infoData: Map<string, TransactionDetailsCellValue>;
  detailsData: Map<string, TransactionDetailsCellValue>;
  account: Account;
  block: Block

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
    this.block = this.route.snapshot.data.transaction as Block;
    const transactionDetails = Object.keys(this.block).map((key:string): TransactionDetailsCellValueMap => [ key, this.block[key]]);
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
