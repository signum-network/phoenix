import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AttachmentEncryptedMessage, AttachmentMessage, Transaction} from '@signumjs/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import hashicon from 'hashicon';
import {uniqBy} from 'lodash';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { TokenData, TokenService } from '../../../shared/services/token.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { DescriptorData } from '@signumjs/standards';
import { NetworkService } from "../../../network/network.service";

type TransactionDetailsCellValue = string | AttachmentMessage | AttachmentEncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

const ColumnsQuery = {
  xl: ['transaction_id', 'timestamp', 'type', 'amount', 'account', 'confirmations'],
  lg: ['transaction_id', 'timestamp', 'type', 'amount', 'account', 'confirmations'],
  md: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
  sm: ['transaction_id', 'timestamp', 'amount', 'account'],
  xs: ['transaction_id', 'timestamp', 'amount'],
};

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('avatar', {static: false}) avatar: ElementRef<HTMLCanvasElement>;

  detailsData: Map<string, TransactionDetailsCellValue>;
  account: WalletAccount;
  transactions: Transaction[] = [];
  dataSource: MatTableDataSource<Transaction>;
  accountQRCodeURL: Promise<string>;
  language: string;
  intervalHandle: any;
  columns: string[] = [];
  tokens: TokenData[] = [];
  isLoadingTokens = true;
  avatarImgSrc: string;
  bgImgSrc: string;

  src44: DescriptorData;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private networkService: NetworkService,
              private tokenService: TokenService,
              private observableMedia: MediaObserver,
              private storeService: StoreService,
              private progressService: FuseProgressBarService,
  ) {
    super();
    router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((val) => {
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
    this.intervalHandle = setInterval(() => {
      this.updateTransactions();
      this.updateTokens();
    }, 30 * 1000);
  }

  public ngAfterContentInit(): void {
    this.observableMedia.asObservable()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((change: MediaChange[]) => {
        this.columns = ColumnsQuery[change[0].mqAlias];
      });
  }

  async initialize(): Promise<void> {
    this.account = this.route.snapshot.data.account;
    this.transactions = this.route.snapshot.data.transactions;
    const blockDetails = Object.keys(this.account).map((key: string): TransactionDetailsCellValueMap => [key, this.account[key]]);
    this.detailsData = new Map(blockDetails);
    this.dataSource = new MatTableDataSource<Transaction>();
    this.dataSource.data = this.transactions;
    this.language = this.storeService.settings.value.language;
    setTimeout(() => {
      this.updateAvatar();
    }, 100);
    this.updateTokens();
  }

  async updateTransactions(): Promise<void> {
    const accountId = this.account.account;
    let transactionList;
    if (this.transactions.length > 0) {
      const timestamp = this.transactions[0].timestamp.toString(10);
      transactionList = await this.accountService.getAccountTransactions({accountId, timestamp});
    } else {
      transactionList = await this.accountService.getAccountTransactions({accountId});
    }

    const {unconfirmedTransactions} = await this.accountService.getUnconfirmedTransactions(accountId);
    this.transactions = uniqBy(unconfirmedTransactions.concat(transactionList.transactions).concat(this.transactions), 'transaction');
    this.dataSource.data = this.transactions;
  }

  private updateAvatar(): void {

    try{
      this.src44 = DescriptorData.parse(this.account.description, false);
      this.avatarImgSrc = this.src44.avatar ? this.networkService.getIpfsCidUrl(this.src44.avatar.ipfsCid) : ''
    }catch (e){
      // ignore
      this.src44 = null;
    }

    if (!this.avatarImgSrc && this.avatar) {
      hashicon(this.account.account, {
        size: 100,
        createCanvas: () => this.avatar.nativeElement
      });
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalHandle);
  }

  private async updateTokens(): Promise<void> {
      this.progressService.show();
      this.isLoadingTokens = true;
      this.tokens = await this.tokenService.fetchAccountTokens(this.account);
      this.isLoadingTokens = false;
      this.progressService.hide();
  }
}
