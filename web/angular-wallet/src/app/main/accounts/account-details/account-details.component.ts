import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '@signumjs/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import hashicon from 'hashicon';
import {uniqBy} from 'lodash';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import { filter, takeUntil, tap } from 'rxjs/operators';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { TokenData, TokenService } from '../../../shared/services/token.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { DescriptorData } from '@signumjs/standards';
import { NetworkService } from 'app/network/network.service';
import { AppService } from 'app/app.service';
import { interval, Subscription } from 'rxjs';
import { constants } from 'app/constants';
import { I18nService } from "../../../layout/components/i18n/i18n.service";

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

  account: WalletAccount;
  transactions: Transaction[] = [];
  dataSource = new MatTableDataSource<Transaction>();
  language: string;
  columns: string[] = [];
  tokens: TokenData[] = [];
  isLoadingTokens = true;
  avatarImgSrc: string;

  src44: DescriptorData;

  accountPolling$: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private accountService: AccountService,
              private networkService: NetworkService,
              private tokenService: TokenService,
              private i18nService: I18nService,
              private observableMedia: MediaObserver,
              private storeService: StoreService,
              private progressService: FuseProgressBarService,
  ) {
    super();
    router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async (val) => {
        if (val instanceof NavigationEnd) {
          await this.initialize();
        }
      });
  }

  async ngOnInit(): Promise<void> {
    await this.initialize();
  }

  public ngAfterContentInit(): void {
    this.observableMedia.asObservable()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((change: MediaChange[]) => {
        this.columns = ColumnsQuery[change[0].mqAlias];
      });
  }

  async initialize(): Promise<void> {
    this.progressService.show();
    this.account = this.route.snapshot.data.account;
    this.dataSource.data = this.transactions;
    this.language = this.storeService.getSettings().language;
    this.updateAvatar();
    this.updateTransactions().then(() => this.progressService.hide());
    this.updateTokens().then(); // non-blocking
    this.listenToAccount();
  }

  private listenToAccount(): void {
    if (this.accountPolling$) {
      this.accountPolling$.unsubscribe();
    }
    // check for pending tx all 10 secs, but only all 120 secs for tokens
    this.accountPolling$ = interval(10_000)
      .pipe(
        tap(async () => this.updateTransactions()),
        filter(i => i % 12 === 0)
      )
      .subscribe(async () => {
        this.account = await this.accountService.getAccount(this.account.account);
        this.updateAvatar();
        await this.updateTokens();
      });
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
    this.avatarImgSrc = null;
    try {
      const src44 = DescriptorData.parse(this.account.description, false);
      this.avatarImgSrc = src44.avatar ? this.networkService.getIpfsCidUrl(src44.avatar.ipfsCid) : '';
      this.src44 = src44;
    } catch (e) {
      // ignore
    }

    if (!this.avatarImgSrc) {
      this.avatarImgSrc = hashicon(this.account.account).toDataURL();
    }
  }

  private async updateTokens(): Promise<void> {
      this.isLoadingTokens = true;
      this.tokens = await this.tokenService.fetchAccountTokens(this.account);
      this.isLoadingTokens = false;
  }

    openInExplorer(): void {
      const host = this.networkService.getChainExplorerHost();
      const url = `${host}/address/${this.account.account}`;
      if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }

  getPublicKeyStatus(): string {
    if (!this.account.keys.publicKey ){
      return this.i18nService.getTranslation('account_unsafe');
    }
    if (this.account.keys.publicKey && this.account.keys.publicKey === constants.smartContractPublicKey){
      return this.i18nService.getTranslation('smart_contract');
    }
    return this.account.keys.publicKey;
  }
}
