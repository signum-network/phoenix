import { Component, OnInit } from '@angular/core';
import { AttachmentEncryptedMessage, AttachmentMessage, Account, Transaction } from '@signumjs/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';

type TransactionDetailsCellValue = string | AttachmentMessage | AttachmentEncryptedMessage | number;
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
  accountQRCodeURL: Promise<string>;
  language: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private storeService: StoreService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.loadAccountAndSetData();
      }
    });
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
    this.dataSource.data = this.route.snapshot.data.transactions;
    this.accountQRCodeURL = this.getAccountQRCodeUrl();
    this.language = this.storeService.settings.value.language;
  }

  async getAccountQRCodeUrl() {
    return await this.accountService.generateSendTransactionQRCodeAddress(this.account.account);
  }

}
