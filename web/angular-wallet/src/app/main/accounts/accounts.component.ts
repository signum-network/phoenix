import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {DeleteAccountDialogComponent} from './delete-account-dialog/delete-account-dialog.component';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { Address } from "@signumjs/core";
import { DescriptorData } from "@signumjs/standards";
import hashicon from 'hashicon';
import { NetworkService } from "../../network/network.service";

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

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private storeService: StoreService,
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
    this.displayedColumns = ['avatar', 'account', 'name', 'balance', 'type', 'delete'];
    this.dataSource = new MatTableDataSource<WalletAccount>();

    this.storeService.ready
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((ready) => {
        if (!ready) { return; }
        this.storeService.getAllAccounts().then((accounts) => {
          this.accounts = accounts;
          this.dataSource.data = this.accounts;
        });

        this.selectedAccount = this.accountService.currentAccount$.value;
      });

    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(({language}) => {
        this.locale = language;
      });

  }

  public getSelectedAccounts(): Array<WalletAccount> {
    return this.accounts.filter(({account}) => this.selectedAccounts[account]);
  }

  public deleteSelectedAccounts(): void {

    const selectedAccounts = this.getSelectedAccounts();

    const dialogRef = this.deleteDialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      data: selectedAccounts
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(confirm => {
        if (!confirm) {
          return;
        }
        selectedAccounts.forEach((account) => {
          this.accountService
            .removeAccount(account)
            .then(() => {
              this.notificationService.notify('success', `Account(s) Deleted`);
              this.storeService.getAllAccounts().then((accounts) => {
                this.accounts = accounts;
                this.dataSource.data = this.accounts;

                if (!accounts || !accounts.length) {
                  this.router.navigate(['/']);
                  this.accountService.selectAccount(null);
                } else if (accounts.map(({account: a}) => a).indexOf(this.selectedAccount.account) < 0) {
                  this.accountService.selectAccount(accounts[0]);
                }
              });
            });
        });
      });
  }

  openDialog(): void {
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

    if(src44 && src44.avatar){
      return this.networkService.getIpfsCidUrl(src44.avatar.ipfsCid);
    }
    return hashicon(account.account).toDataURL();
  }
}
