import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subject, throwError } from 'rxjs';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { AccountService } from './setup/account/account.service';
import { StoreService } from './store/store.service';
import { Account, ApiError, Block, BlockchainStatus } from '@burstjs/core';
import { NotifierService } from 'angular-notifier';
import { NetworkService } from './network/network.service';
import { I18nService } from './layout/components/i18n/i18n.service';
import { UtilService } from './util.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  firstTime = true;
  isScanning = false;
  downloadingBlockchain = false;
  previousLastBlock = "0";
  lastBlock = "0";
  isLoggedIn = false;
  selectedAccount: Account;
  accounts: Account[];
  BLOCKCHAIN_STATUS_INTERVAL = 10000; // 10 secs
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _platform: Platform,
    private storeService: StoreService,
    private accountService: AccountService,
    private networkService: NetworkService,
    private notifierService: NotifierService,
    private utilService: UtilService
  ) {

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.storeService.ready.subscribe((ready) => {
      if (ready) {
        this.checkBlockchainStatus();
        this.updateAccounts();
        setInterval(this.checkBlockchainStatus.bind(this), this.BLOCKCHAIN_STATUS_INTERVAL);
      }
      this.accountService.currentAccount.subscribe(async (account) => {
        this.selectedAccount = account;
        this.accounts = await this.storeService.getAllAccounts();
      })
    });
  }

  private async checkBlockchainStatus() {
      try {
        const blockchainStatus = await this.networkService.getBlockchainStatus();
        // @ts-ignore - todo: fix these
        if (blockchainStatus.errorCode) {
          // @ts-ignore
          throw new Error(blockchainStatus.errorDescription);
        }
        this.isScanning = !this.firstTime && (this.previousLastBlock != blockchainStatus.lastBlock);
        this.previousLastBlock = blockchainStatus.lastBlock;
        if (this.isScanning && !this.firstTime) {
          await this.updateAccountsAndCheckBlockchainStatus(blockchainStatus);
        } else if (this.selectedAccount) {
          this.accountService.synchronizeAccount(this.selectedAccount).catch(() => { });
        }
        this.firstTime = false;
      } catch (e) {
        return this.notifierService.notify('error', this.utilService.translateServerError(e));
      }
  }

  private async updateAccountsAndCheckBlockchainStatus(blockchainStatus: BlockchainStatus) {
    this.updateAccounts();
    const block = await this.networkService.getBlockById(blockchainStatus.lastBlock);
    // @ts-ignore
    if (block.errorCode) {
      // @ts-ignore
      throw new Error(block.errorDescription);
    }
    this.storeService.saveBlock(block);
    this.checkBlockchainStatus();
  }

  private async updateAccounts() {
    this.storeService.getSelectedAccount().then((account) => {
      if (account !== this.selectedAccount) {
        this.selectedAccount = account;
        this.accountService.selectAccount(account);
      }
    });

    this.accounts = await this.storeService.getAllAccounts();
    this.accounts.map((account) => {
      setTimeout(() => {
        this.accountService.synchronizeAccount(account).catch(() => {});
      }, 1);
    });

  private updateAccounts() {
    this.storeService.getSelectedAccount().then((account) => {
      if (account) {
        this.selectedAccount = account;
        this.accountService.selectAccount(account);
      }
    });
    this.storeService.getAllAccounts().then((accounts) => {
      this.accounts = accounts;
      accounts.map((account) => {
        setTimeout(() => {
          this.accountService.synchronizeAccount(account).catch(() => {});
        }, 1);
      });
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
