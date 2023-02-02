import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../util/UnsubscribeOnDestroy';
import { I18nService } from '../../shared/services/i18n.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { Address } from '@signumjs/core';
import { DescriptorData } from '@signumjs/standards';
import hashicon from 'hashicon';
import { NetworkService } from '../../network/network.service';
import { AppService } from '../../app.service';
import { MatPaginator } from '@angular/material/paginator';
import { AccountManagementService } from 'app/shared/services/account-management.service';

@Component({
  selector: 'app-accounts',
  styleUrls: ['./accounts.component.scss'],
  templateUrl: './accounts.component.html'
})
export class AccountsComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<WalletAccount>;
  displayedColumns: string[];
  public accounts: WalletAccount[];
  public selectedAccount: WalletAccount;
  public selectedAccounts: object;
  public locale: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private appService: AppService,
    private accountService: AccountService,
    private accountManagementService: AccountManagementService,
    private notificationService: NotifierService,
    private networkService: NetworkService,
    private i18nService: I18nService,
    private deleteDialog: MatDialog,
    public router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.accounts = [];
    this.selectedAccounts = {};
    this.selectedAccount = this.accountManagementService.getSelectedAccount();
    this.accounts = this.accountManagementService.getAllAccounts();
    this.displayedColumns = ['delete', 'avatar', 'account', 'name', 'balance', 'type', 'actions'];
    this.dataSource = new MatTableDataSource<WalletAccount>();
    this.dataSource.data = this.accounts;

    this.storeService.languageSelected$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((language) => {
        this.locale = language;
      });

    this.storeService.accountSelected$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((acc) => {
        this.selectedAccount = acc;
      });
  }

  private sortAccounts(accounts: WalletAccount[], sort: MatSort): WalletAccount[] {

    const dir = (result: number) => sort.direction === 'asc' ? result : -result;

    const typeValue = (a: WalletAccount) => {
      if (a.type !== 'offline' && !a.confirmed) { return 0; }
      if (a.type !== 'offline' && a.confirmed) { return 1; }
      if (a.type === 'offline') { return 2; }
    };

    const comparatorMap = {
      // precision is not important here, but speed
      balance: (a: WalletAccount, b: WalletAccount) => parseInt(a.balanceNQT, 10) - parseInt(b.balanceNQT, 10),
      account: (a: WalletAccount, b: WalletAccount) => a.account.localeCompare(b.account),
      name: (a: WalletAccount, b: WalletAccount) => a.name ? a.name.localeCompare(b.name) : 0,
      type: (a: WalletAccount, b: WalletAccount) => typeValue(a) - typeValue(b),
    };
    const comparator = comparatorMap[sort.active] || comparatorMap.account;
    return accounts.sort((a, b) => dir(comparator(a, b)));
  }


  public getSelectedAccounts(): WalletAccount[] {
    return this.accounts.filter(({ account }) => this.selectedAccounts[account]);
  }

  public deleteSelectedAccounts(): void {
    this.deleteAccounts(this.getSelectedAccounts());
  }

  public deleteAccount(account: WalletAccount): void {
    this.deleteAccounts([account]);
  }

  private deleteAccounts(accounts: WalletAccount[]): void {

    if (!accounts.length) { return; }

    const dialogRef = this.deleteDialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      data: accounts
    });

    dialogRef.afterClosed()
      .subscribe(async (confirm) => {
        if (!confirm) {
          return;
        }
        const isRemovingSelectedAccount = accounts.findIndex(a => a.account === this.selectedAccount.account) !== -1;
        accounts.forEach( a => this.accountManagementService.removeAccount(a.account));
        this.accounts = this.accountManagementService.getAllAccounts();
        this.dataSource.data = this.accounts;
        if (!this.accounts || !this.accounts.length) {
          await this.accountManagementService.selectAccount(null);
          await this.router.navigate(['/']);
        } else if (isRemovingSelectedAccount) {
          await this.accountManagementService.selectAccount(this.accounts[0]);
        }
        this.notificationService.notify('success', this.i18nService.getTranslation('account_successfully_deleted'));
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortData = this.sortAccounts;
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  async activateAccount(account: WalletAccount): Promise<void> {
    try {
      await this.accountService.activateAccount(account);
      this.notificationService.notify('success', this.i18nService.getTranslation('activation_success'));
    } catch (e) {
      const activationFailed = this.i18nService.getTranslation('activation_failed');
      this.notificationService.notify('error', `${activationFailed} ${e.message}`);
    }
  }
  async selectAccount(account: WalletAccount): Promise<void> {
    try {
      await this.accountManagementService.selectAccount(account);
    } catch (e) {
      console.warn('selectAccount', e.message);
    }
  }

  toAddress(account: WalletAccount): string {
    if (account) {
      try {
        return Address.fromNumericId(account.account).getReedSolomonAddress(false);
      } catch (e) {
        return '';
      }
    }
    return '';
  }

  getAvatarUrl(account: WalletAccount): string {
    let src44 = null;
    try {
      src44 = DescriptorData.parse(account.description, false);
    } catch (e) {
      // ignore
    }

    if (src44 && src44.avatar) {
      return this.networkService.getIpfsCidUrl(src44.avatar.ipfsCid);
    }
    return hashicon(account.account).toDataURL();
  }



  async copyToClipboard(data: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(data);
      this.notificationService.notify('success',
        this.i18nService.getTranslation('success_clipboard_copy')
      );
    } catch (e) {
      this.notificationService.notify('error',
        this.i18nService.getTranslation('error_clipboard_copy')
      );
    }
  }

  openInExplorer(account: WalletAccount): void {
    const host = this.networkService.getChainExplorerHost();
    const url = `${host}/address/${account.account}`;
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }

  routeToAccount(account: WalletAccount): void {
    this.router.navigate(['/account', account.account]);
  }

  sendToAccount(account: WalletAccount): void {
    this.router.navigate(['/send'], {
      queryParams: {
        receiver: account.account
      }
    });
  }

  isUnsafeAccount(account: WalletAccount): boolean {
    return account.type !== 'offline' && !account.confirmed;
  }
}
