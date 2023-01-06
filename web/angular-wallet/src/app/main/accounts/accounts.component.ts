import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../util/UnsubscribeOnDestroy';
import { I18nService } from '../../layout/components/i18n/i18n.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { Address } from '@signumjs/core';
import { DescriptorData } from '@signumjs/standards';
import hashicon from 'hashicon';
import { NetworkService } from '../../network/network.service';
import { AppService } from '../../app.service';
import { MatPaginator } from '@angular/material/paginator';

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private appService: AppService,
    private accountService: AccountService,
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
    this.displayedColumns = ['delete', 'avatar', 'account', 'name', 'balance', 'type', 'actions'];
    this.dataSource = new MatTableDataSource<WalletAccount>();

    this.storeService.ready
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((ready) => {
        if (!ready) {
          return;
        }
        this.storeService.getAllAccounts().then((accounts) => {
          this.accounts = accounts;
          this.dataSource.data = this.accounts;
          this.dataSource.sortData = this.sortAccounts;
        });

        this.selectedAccount = this.accountService.currentAccount$.value;
      });

    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ language }) => {
        this.locale = language;
      });

  }

  private sortAccounts(accounts: WalletAccount[], sort: MatSort): WalletAccount[] {

    const dir = (result: number) => sort.direction === 'asc' ? result : -result;

    const typeValue = (a: WalletAccount) => {
      if (a.type !== 'offline' && !a.confirmed) { return 0; }
      if (a.type !== 'offline' && a.confirmed) { return 1; }
      if (a.type === 'offline') { return 2; }
    }

    const comparatorMap = {
      // precision is not important here, but speed
      balance: (a: WalletAccount, b: WalletAccount) => parseInt(a.balanceNQT, 10) - parseInt(b.balanceNQT, 10),
      account: (a: WalletAccount, b: WalletAccount) => a.account.localeCompare(b.account),
      name: (a: WalletAccount, b: WalletAccount) => a.name.localeCompare(b.name),
      type: (a: WalletAccount, b: WalletAccount) => typeValue(a) - typeValue(b),
    };
    const comparator = comparatorMap[sort.active] || comparatorMap.account;
    return accounts.sort((a, b) => dir(comparator(a, b)));
  }


  public getSelectedAccounts(): Array<WalletAccount> {
    return this.accounts.filter(({ account }) => this.selectedAccounts[account]);
  }

  public deleteSelectedAccounts(): void {

    const selectedAccounts = this.getSelectedAccounts();

    const dialogRef = this.deleteDialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      data: selectedAccounts
    });

    dialogRef.afterClosed()
      .subscribe(async (confirm) => {
        if (!confirm) {
          return;
        }
        const removeRequests = selectedAccounts.map((a) => this.accountService.removeAccount(a));
        await Promise.all(removeRequests);
        this.accounts = await this.storeService.getAllAccounts();
        const removedSelectedAccount = this.accounts.findIndex(a => a.account === this.selectedAccount.account) < 0;
        this.dataSource.data = this.accounts;
        if (!this.accounts || !this.accounts.length) {
          this.accountService.selectAccount(null);
          this.router.navigate(['/']);
        } else if (removedSelectedAccount) {
          this.accountService.selectAccount(this.accounts[0]);
        }
        this.notificationService.notify('success', this.i18nService.getTranslation('account_successfully_deleted'));
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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

  deleteAccount(account: WalletAccount): void {
    const dialogRef = this.deleteDialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      data: [account]
    });

    const wasSelectedAccount = account.account === this.selectedAccount.account;

    dialogRef.afterClosed().subscribe(async confirm => {
      if (!confirm) {
        return;
      }
      await this.accountService.removeAccount(account);
      this.accounts = await this.storeService.getAllAccounts();
      this.dataSource.data = this.accounts;
      if (!this.accounts || !this.accounts.length) {
        this.accountService.selectAccount(null);
        this.router.navigate(['/']);
      } else if (wasSelectedAccount) {
        this.accountService.selectAccount(this.accounts[0]);
      }
      this.notificationService.notify('success', this.i18nService.getTranslation('account_successfully_deleted'));
    });
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
