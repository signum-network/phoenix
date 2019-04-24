import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {DeleteAccountDialogComponent} from './delete-account-dialog/delete-account-dialog.component';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {Account} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util/out';

@Component({
  selector: 'app-accounts',
  styleUrls: ['./accounts.component.scss'],
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit, AfterViewInit {
  private dataSource: MatTableDataSource<Account>;
  private displayedColumns: string[];
  public accounts: Account[];
  public selectedAccounts: object;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    private notificationService: NotifierService,
    private deleteDialog: MatDialog,
    public router: Router
  ) {
  }

  public ngOnInit(): void {
    this.accounts = [];
    this.selectedAccounts = {};
    this.displayedColumns = ['type', 'account', 'accountRS', 'balanceNQT', 'name', 'delete'];
    this.dataSource = new MatTableDataSource<Account>();

    this.storeService.ready.subscribe((ready) => {
      this.storeService.getAllAccounts().then((accounts) => {
        this.accounts = accounts;
        this.dataSource.data = this.accounts;
      });
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

    dialogRef.afterClosed().subscribe(confirm => {
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
            });
          });
      });
    });
  }

  openDialog(): void {
  }

  public ngAfterViewInit(): void{
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
}
