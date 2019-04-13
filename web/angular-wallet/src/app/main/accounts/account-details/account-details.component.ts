import { Component, OnInit } from '@angular/core';
import { EncryptedMessage, Message, Account, Transaction } from '@burstjs/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

type TransactionDetailsCellValue = string | Message | EncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  detailsData: Map<string, TransactionDetailsCellValue>;
  account: Account;
  transactions: Transaction[];
  dataSource: MatTableDataSource<Transaction>;

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.loadAccountAndSetData();
      }
    }) 
  }

  public getDetailsData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.detailsData.entries());
  } 

  ngOnInit() {
    this.loadAccountAndSetData();
  }

  loadAccountAndSetData() {
    this.account = this.route.snapshot.data.account as Account;
    const blockDetails = Object.keys(this.account).map((key:string): TransactionDetailsCellValueMap => [ key, this.account[key]]);
    this.detailsData = new Map(blockDetails);
    this.dataSource = new MatTableDataSource<Transaction>();
    this.dataSource.data = this.route.snapshot.data.transactions.transactions;
  }

}
