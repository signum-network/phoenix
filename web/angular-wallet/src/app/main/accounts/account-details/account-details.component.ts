import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AttachmentEncryptedMessage, AttachmentMessage, Account, Transaction} from '@signumjs/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import hashicon from 'hashicon';

type TransactionDetailsCellValue = string | AttachmentMessage | AttachmentEncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('avatar', {static: false}) avatar: ElementRef<HTMLCanvasElement>;

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

  ngOnInit(): void {
    this.loadAccountAndSetData();
    setTimeout(() => {
      this.updateAvatar();
    }, 250)
  }

  loadAccountAndSetData(): void {
    this.account = this.route.snapshot.data.account as Account;
    const blockDetails = Object.keys(this.account).map((key: string): TransactionDetailsCellValueMap => [key, this.account[key]]);
    this.detailsData = new Map(blockDetails);
    this.dataSource = new MatTableDataSource<Transaction>();
    this.dataSource.data = this.route.snapshot.data.transactions;
    this.accountQRCodeURL = this.getAccountQRCodeUrl();
    this.language = this.storeService.settings.value.language;
  }

  async getAccountQRCodeUrl(): Promise<string> {
    return this.accountService.generateSendTransactionQRCodeAddress(this.account.account);
  }

  private updateAvatar(): void {
    if (this.avatar) {
      hashicon(this.account.account, {
        size: 100,
        createCanvas: () => this.avatar.nativeElement
      });
    }
  }


}
