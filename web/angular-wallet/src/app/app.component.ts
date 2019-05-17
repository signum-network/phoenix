import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {Subject} from 'rxjs';

import {FuseSplashScreenService} from '@fuse/services/splash-screen.service';
import {FuseConfigService} from '@fuse/services/config.service';
import {AccountService} from './setup/account/account.service';
import {StoreService} from './store/store.service';
import {Account, BlockchainStatus} from '@burstjs/core';
import {NotifierService} from 'angular-notifier';
import {NetworkService} from './network/network.service';
import {I18nService} from './layout/components/i18n/i18n.service';
import {UtilService} from './util.service';
import {ElectronService} from 'ngx-electron';
import {MatDialog, MatDialogRef} from '@angular/material';
import {
  CertificationInfo,
  NewVersionDialogComponent,
  UpdateInfo
} from './components/new-version-dialog/new-version-dialog.component';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  firstTime = true;
  isScanning = false;
  newVersionAvailable = true;
  updateInfo: UpdateInfo;
  downloadingBlockchain = false;
  previousLastBlock = '0';
  lastBlock = '0';
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
    private utilService: UtilService,
    private electronService: ElectronService,
    private newVersionDialog: MatDialog,
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
        this.updateAccounts();
        setInterval(this.checkBlockchainStatus.bind(this), this.BLOCKCHAIN_STATUS_INTERVAL);
      }
      this.accountService.currentAccount.subscribe(async (account) => {
        this.selectedAccount = account;
        this.accounts = await this.storeService.getAllAccounts();
      });
    });

    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.on('new-version', (event, newVersion) => {
        this.newVersionAvailable = true;
        this.updateInfo = new UpdateInfo(
          '1.0.0-beta.5',
          '1.0.0-beta.6',
          'win',
          [],
          'https://github.com/burst-apps-team/phoenix/releases/tag/v1.0.0-beta.6',
          new CertificationInfo('github.com', 'DigiCerts', new Date())
        );
      });
    }
  }

  private async checkBlockchainStatus(): Promise<void> {
    try {
      const blockchainStatus = await this.networkService.getBlockchainStatus();
      this.isScanning = !this.firstTime && (this.previousLastBlock !== blockchainStatus.lastBlock);
      this.previousLastBlock = blockchainStatus.lastBlock;
      if (this.isScanning) {
        await this.updateAccountsAndCheckBlockchainStatus(blockchainStatus);
      } else if (this.selectedAccount) {
        this.accountService.synchronizeAccount(this.selectedAccount).catch(() => {
        });
      }
      this.firstTime = false;
    } catch (e) {
      this.notifierService.notify('error', this.utilService.translateServerError(e));
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

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  private openNewVersionDialog(): MatDialogRef<NewVersionDialogComponent> {

    this.updateInfo = new UpdateInfo(
      '1.0.0-beta.5',
      '1.0.0-beta.6',
      'win',
      ['asset1.exe', 'asset2-setup.exe'],
      'https://github.com/burst-apps-team/phoenix/releases/tag/v1.0.0-beta.6',
      new CertificationInfo('github.com', 'DigiCerts', new Date())
    );

    return this.newVersionDialog.open(NewVersionDialogComponent, {
      data: this.updateInfo
    });
  }

  onClickedNewVersion(): void {
    const dialogRef = this.openNewVersionDialog();
    dialogRef.afterClosed().subscribe(ok => {
        console.log('ok - new version closed');
      }
    );
  }
}
