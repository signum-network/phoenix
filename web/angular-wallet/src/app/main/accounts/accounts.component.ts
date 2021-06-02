import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {NotifierService} from 'angular-notifier';
import {DeleteAccountDialogComponent} from './delete-account-dialog/delete-account-dialog.component';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {Account} from '@signumjs/core';
import {convertNQTStringToNumber} from '@signumjs/util/out';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {I18nService} from '../../layout/components/i18n/i18n.service';

@Component({
  selector: 'app-accounts',
  styleUrls: ['./accounts.component.scss'],
  templateUrl: './accounts.component.html'
})
export class AccountsComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  private dataSource: MatTableDataSource<Account>;
  private displayedColumns: string[];
  public accounts: Account[];
  public selectedAccount: Account;
  public selectedAccounts: object;
  public locale: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    private notificationService: NotifierService,
    private i18nService: I18nService,
    private deleteDialog: MatDialog,
    public router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.accounts = [];
    this.selectedAccounts = {};
    this.displayedColumns = ['type', 'account', 'accountRS', 'name', 'balanceNQT', 'description', 'delete'];
    this.dataSource = new MatTableDataSource<Account>();

    this.storeService.ready
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((ready) => {
        this.storeService.getAllAccounts().then((accounts) => {
          this.accounts = accounts;
          this.dataSource.data = this.accounts;
        });

        this.selectedAccount = this.accountService.currentAccount.value;
      });

    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(({language}) => {
        this.locale = language;
      });

  }

  public getSelectedAccounts(): Array<Account> {
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
              } else if (accounts.map(({ account }) => account).indexOf(this.selectedAccount.account) < 0) {
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

  public convertNQTStringToNumber(balanceNQT): number {
    return convertNQTStringToNumber(balanceNQT);
  }

  async activateAccount(account: Account): Promise<void> {
    try{
      await this.accountService.activateAccount(account);
      this.notificationService.notify('success', this.i18nService.getTranslation('activation_success'));
    } catch (e){
      const activationFailed = this.i18nService.getTranslation('activation_failed');
      this.notificationService.notify('error', `${activationFailed} ${e.message}`);
    }
  }
}
