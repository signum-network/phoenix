import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { Account } from '@burstjs/core';

@Component({
    selector: 'app-accounts',
    styleUrls: ['./accounts.component.scss'],
    templateUrl: './accounts.component.html'
})
export class AccountsComponent {
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
    ) {}

    public ngOnInit() {
        this.accounts = [];
        this.selectedAccounts = {};
        this.displayedColumns = ['id', 'address', 'balance', 'alias', 'delete'];
        this.dataSource = new MatTableDataSource<Account>();
  
        this.storeService.ready.subscribe((ready) => {
            this.storeService.getAllAccounts().then((accounts) => {
                this.accounts = accounts;
                this.dataSource.data = this.accounts;
            })
          });
    }

    public getSelectedAccounts() {
        return this.accounts.filter(({id}) => {
            return this.selectedAccounts[id]
        });
    }

    public deleteSelectedAccounts() {

        const selectedAccounts = this.getSelectedAccounts();

        const dialogRef = this.deleteDialog.open(DeleteAccountDialogComponent, {
            width: '400px',
            data: selectedAccounts 
        });
        
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                return selectedAccounts.map((account) => {
                    this.accountService.removeAccount(account).then(() => {
                        this.notificationService.notify(`success`, `Account(s) Deleted`);
                        this.storeService.getAllAccounts().then((accounts) => {
                            this.accounts = accounts;
                            this.dataSource.data = this.accounts;
                        })
                    });
                });
            }
        });
    }

    openDialog(): void {
    }

    public ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
