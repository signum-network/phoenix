import {Component, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {AttachmentEncryptedMessage, AttachmentMessage, Account, Transaction} from '@signumjs/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import hashicon from 'hashicon';
import {uniqBy} from 'lodash';

type TransactionDetailsCellValue = string | AttachmentMessage | AttachmentEncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('avatar', {static: false}) avatar: ElementRef<HTMLCanvasElement>;

  detailsData: Map<string, TransactionDetailsCellValue>;
  account: Account;
  transactions: Transaction[] = [];
  dataSource: MatTableDataSource<Transaction>;
  accountQRCodeURL: Promise<string>;
  language: string;
  intervalHandle: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private storeService: StoreService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.initialize();
      }
    });
  }

  public getDetailsData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.detailsData.entries());
  }

  ngOnInit(): void {
    this.initialize();
    setTimeout(() => {
      this.updateAvatar();
    }, 100);

    this.intervalHandle = setInterval(() => this.updateTransactions(), 30 * 1000);
  }

  initialize(): void {
    this.account = this.route.snapshot.data.account as Account;
    this.transactions = this.route.snapshot.data.transactions as Transaction[];
    const blockDetails = Object.keys(this.account).map((key: string): TransactionDetailsCellValueMap => [key, this.account[key]]);
    this.detailsData = new Map(blockDetails);
    this.dataSource = new MatTableDataSource<Transaction>();
    this.dataSource.data = this.transactions;
    this.language = this.storeService.settings.value.language;
  }

  async updateTransactions(): Promise<void> {
    const accountId = this.account.account;
    let transactionList;
    if (this.transactions.length > 0) {
      const timestamp = this.transactions[0].timestamp.toString(10);
      transactionList = await this.accountService.getAccountTransactions({accountId, timestamp});
    } else{
      transactionList = await this.accountService.getAccountTransactions({accountId});
    }

    const {unconfirmedTransactions} = await this.accountService.getUnconfirmedTransactions(accountId);
    this.transactions = uniqBy(unconfirmedTransactions.concat(transactionList.transactions).concat(this.transactions), 'transaction');
    this.dataSource.data = this.transactions;
  }

  private updateAvatar(): void {
    if (this.avatar) {
      hashicon(this.account.account, {
        size: 100,
        createCanvas: () => this.avatar.nativeElement
      });
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalHandle);
  }


}
