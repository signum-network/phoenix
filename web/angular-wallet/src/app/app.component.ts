import {Component, Inject, OnDestroy, OnInit, ApplicationRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {AccountService} from './setup/account/account.service';
import {StoreService} from './store/store.service';
import {Account, BlockchainStatus} from '@burstjs/core';
import {parseDeeplink, EncoderFormat} from '@burstjs/util';
import {NotifierService} from 'angular-notifier';
import {NetworkService} from './network/network.service';
import {UtilService} from './util.service';
import {I18nService} from './layout/components/i18n/i18n.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  CertificationInfo,
  NewVersionDialogComponent,
  UpdateInfo
} from './components/new-version-dialog/new-version-dialog.component';

import {version} from '../../package.json';
import {AppService} from './app.service';
import {UnsubscribeOnDestroy} from './util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {Router, DefaultUrlSerializer, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET} from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UnsubscribeOnDestroy implements OnInit, OnDestroy {
  firstTime = true;
  isScanning = false;
  isDownloadingUpdate = false;
  newVersionAvailable = false;
  updateInfo: UpdateInfo;
  downloadingBlockchain = false;
  numberOfBlocks: number;
  lastBlockchainFeederHeight: number;
  previousLastBlock = '0';
  lastBlock = '0';
  isLoggedIn = false;
  selectedAccount: Account;
  accounts: Account[];
  BLOCKCHAIN_STATUS_INTERVAL = 30000;
  urlSerializer = new DefaultUrlSerializer();
  percentDownloaded: number;
  blockchainStatusInterval: any = null;

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
    private newVersionDialog: MatDialog,
    private router: Router,
    private applicationRef: ApplicationRef,
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
          const checkBlockchainStatus = this.checkBlockchainStatus.bind(this);
          setTimeout(checkBlockchainStatus, 1000);
          this.blockchainStatusInterval = setInterval(checkBlockchainStatus, this.BLOCKCHAIN_STATUS_INTERVAL);
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
      this.initDeepLinkHandler();
      this.initRouteToHandler();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    clearInterval(this.blockchainStatusInterval);
  }

  private initDeepLinkHandler(): void {
    this.appService.onIpcMessage('deep-link-clicked', async (url) => {
      const deeplinkUrl = new URL(url);
      if (deeplinkUrl.pathname === '//v1') {
        await this.routeCIP22Deeplink(url);
      } else {
        await this.routeLegacyDeeplink(url);
      }
      // fixes an issue with the view not rendering
      setTimeout(() => {
        this.applicationRef.tick();
      }, 1000);
    });
  }

  private async routeCIP22Deeplink(url: string): Promise<void> {
    const parts = parseDeeplink(url);
    let route = '';
    // do the routing here
    switch (parts.action) {
      case 'send-amount':
      case 'pay':
        route = 'send-burst';
        break;
      default:
        this.notifierService.notify('warning', `Unknown deep link action: ${parts.action}`);
    }

    const {payload} = parts;
    await this.router.navigate([route], {queryParams: {cip22: true, payload}});
  }

  private async routeLegacyDeeplink(url: string): Promise<void> {
    const parsedUrl = this.urlSerializer.parse(url.replace('burst://', ''));
    const g: UrlSegmentGroup = parsedUrl.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    await this.router.navigate([s[0].path.replace('requestBurst', 'send')], {
      queryParams: parsedUrl.queryParams,
      queryParamsHandling: 'merge'
    });
  }


  private initRouteToHandler(): void {
    this.appService.onIpcMessage('route-to', (url) => {
      this.router.navigate([url]);
      setTimeout(() => {
        this.applicationRef.tick();
      }, 1000);
    });
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
      this.isDownloadingUpdate = true;
      this.appService.showDesktopMessage(
        this.i18nService.getTranslation('download_started'),
        this.i18nService.getTranslation('downloading_update')
      );
    });

    this.appService.onIpcMessage('new-version-download-finished', () => {
      this.isDownloadingUpdate = false;
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
      this.numberOfBlocks = blockchainStatus.numberOfBlocks;
      this.lastBlockchainFeederHeight = blockchainStatus.lastBlockchainFeederHeight;
      this.percentDownloaded = Math.round(blockchainStatus.numberOfBlocks / blockchainStatus.lastBlockchainFeederHeight * 100);
      this.downloadingBlockchain = this.percentDownloaded < 100;
      this.previousLastBlock = blockchainStatus.lastBlock;
      if (this.isScanning) {
        setTimeout(async () => {
          await this.updateAccountsAndCheckBlockchainStatus(blockchainStatus);
        }, 1000);
      } else if (this.selectedAccount) {
        await this.accountService.synchronizeAccount(this.selectedAccount).catch(() => {
        });
        this.accountService.setCurrentAccount(this.selectedAccount);
        // hit this call again every 1 sec if the blockchain is being downloaded
      } else if (this.downloadingBlockchain) {
        setTimeout(this.checkBlockchainStatus.bind(this), 1000);
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

    if (this.isDownloadingUpdate) {
      return;
    }

    this.openNewVersionDialog()
      .afterClosed()
      .subscribe(assetUrl => {
        if (assetUrl) {
          this.appService.sendIpcMessage('new-version-asset-selected', assetUrl);
        }
      });

  }
}
