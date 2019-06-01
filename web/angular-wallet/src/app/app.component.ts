import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {Subject} from 'rxjs';
import {AccountService} from './setup/account/account.service';
import {StoreService} from './store/store.service';
import {Account, BlockchainStatus} from '@burstjs/core';
import {NotifierService} from 'angular-notifier';
import {NetworkService} from './network/network.service';
import {UtilService} from './util.service';
import {I18nService} from './layout/components/i18n/i18n.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  CertificationInfo,
  NewVersionDialogComponent,
  UpdateInfo
} from './components/new-version-dialog/new-version-dialog.component';

import {version} from '../../package.json';
import {AppService} from './app.service';
import {UnsubscribeOnDestroy} from './util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UnsubscribeOnDestroy implements OnInit, OnDestroy {
  firstTime = true;
  isScanning = false;

  newVersionAvailable = false;
  updateInfo: UpdateInfo;
  downloadingBlockchain = false;
  previousLastBlock = '0';
  lastBlock = '0';
  isLoggedIn = false;
  selectedAccount: Account;
  accounts: Account[];
  BLOCKCHAIN_STATUS_INTERVAL = 30000; // 30 secs

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _platform: Platform,
    private storeService: StoreService,
    private accountService: AccountService,
    private networkService: NetworkService,
    private notifierService: NotifierService,
    private utilService: UtilService,
    private i18nService: I18nService,
    private appService: AppService,
    private newVersionDialog: MatDialog
  ) {
    super();
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
  }

  ngOnInit(): void {
    this.storeService.ready
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((ready) => {
        if (ready) {
          this.updateAccounts();
          setInterval(this.checkBlockchainStatus.bind(this), this.BLOCKCHAIN_STATUS_INTERVAL);
        }
        this.accountService.currentAccount
          .pipe(
            takeUntil(this.unsubscribeAll)
          )
          .subscribe(async (account) => {
            this.selectedAccount = account;
            this.accounts = await this.storeService.getAllAccounts();
          });
      });

    if (this.appService.isDesktop()) {
      this.initDesktopUpdater();
    }
  }

  private initDesktopUpdater(): void {
    this.appService.onIpcMessage('new-version', (newVersion) => {
      this.newVersionAvailable = true;

      const {assets, releaseVersion, platform, validCert, htmlUrl} = newVersion;
      const {domain, issuer, validThru, isValid} = validCert;

      const certInfo = new CertificationInfo(isValid, domain, issuer, validThru);

      this.updateInfo = new UpdateInfo(
        version,
        releaseVersion,
        platform,
        assets,
        htmlUrl,
        certInfo
      );
    });

    this.appService.onIpcMessage('new-version-download-started', () => {
      this.appService.showDesktopMessage(
        this.i18nService.getTranslation('download_started'),
        this.i18nService.getTranslation('downloading_update')
      );
    });

    this.appService.onIpcMessage('new-version-check-noupdate', () => {
      this.appService.showDesktopMessage(
        this.i18nService.getTranslation('update_check'),
        this.i18nService.getTranslation('update_up_to_date')
      );
    });
  }

  private async checkBlockchainStatus(): Promise<void> {
    try {
      const blockchainStatus = await this.networkService.getBlockchainStatus();
      this.isScanning = !this.firstTime && (this.previousLastBlock !== blockchainStatus.lastBlock);
      this.previousLastBlock = blockchainStatus.lastBlock;
      if (this.isScanning) {
        await this.updateAccountsAndCheckBlockchainStatus(blockchainStatus);
      } else if (this.selectedAccount) {
        await this.accountService.synchronizeAccount(this.selectedAccount).catch(() => {
        });
        this.accountService.setCurrentAccount(this.selectedAccount);
      }
      this.firstTime = false;
    } catch (e) {
      return this.notifierService.notify('error', this.utilService.translateServerError(e));
    }
  }

  private async updateAccountsAndCheckBlockchainStatus(blockchainStatus: BlockchainStatus): Promise<void> {
    this.updateAccounts();
    const block = await this.networkService.getBlockById(blockchainStatus.lastBlock);
    this.networkService.addBlock(block);
    this.checkBlockchainStatus();
  }

  private async updateAccounts(): Promise<void> {
    this.storeService.getSelectedAccount().then((account) => {
      if (account !== this.selectedAccount) {
        this.selectedAccount = account;
        this.accountService.selectAccount(account);
      }
    });

    this.accounts = await this.storeService.getAllAccounts();
    this.accounts.map((account) => {
      setTimeout(() => {
        this.accountService.synchronizeAccount(account).catch(() => {
        });
      }, 1);
    });
  }


  private openNewVersionDialog(): MatDialogRef<NewVersionDialogComponent> {
    return this.newVersionDialog.open(NewVersionDialogComponent, {
      data: this.updateInfo
    });
  }

  onClickedNewVersion(): void {
    this.openNewVersionDialog()
      .afterClosed()
      .subscribe(assetUrl => {
        if (assetUrl) {
          this.appService.sendIpcMessage('new-version-asset-selected', assetUrl);
        }
      });

  }
}
