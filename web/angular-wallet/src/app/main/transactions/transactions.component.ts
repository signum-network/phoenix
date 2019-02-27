import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Transaction, Account } from '@burstjs/core';
import { Converter } from '@burstjs/crypto';
import { FormControl } from '@angular/forms';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { NotifierService } from 'angular-notifier';
import { convertNQTStringToNumber } from '@burstjs/util';
import { UtilService } from 'app/util.service';

@Component({
    selector: 'app-transactions',
    styleUrls: ['./transactions.component.scss'],
    templateUrl: './transactions.component.html'
})
export class TransactionsComponent {
    public dataSource: MatTableDataSource<Transaction>;
    public convertNQTStringToNumber = convertNQTStringToNumber;
    public displayedColumns: string[];
    private account: Account;
    pickerFromField = new FormControl();
    pickerToField = new FormControl();


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private accountService: AccountService,
        private storeService: StoreService,
        private notifierService: NotifierService,
        private utilService: UtilService
    ) {}

    public async ngOnInit() {
        this.displayedColumns = ['transaction_id', 'attachment', 'timestamp', 'type', 'amount', 'fee', 'account', 'confirmations'];
        this.dataSource = new MatTableDataSource<Transaction>();
        this.account = await this.storeService.getSelectedAccount();
        this.accountService.getAccountTransactions(this.account.id).then(transactions => {
            if (transactions.errorCode) {
                this.notifierService.notify('error', 'Error fetching transactions');
            }
            this.dataSource.data = transactions.transactions;
        });
    }

    public ngAfterViewInit() {
        const defaultFilterPredicate = this.dataSource.filterPredicate;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filterValue: string) => {
          const date = this.convertTimestamp(data.timestamp);
          let withinRange = true;
            if (this.pickerFromField.value && this.pickerToField.value) {
                withinRange = date > this.pickerFromField.value &&
                date < this.pickerToField.value;
            } else if (this.pickerFromField.value) {
                withinRange = date > this.pickerFromField.value;
            } else if (this.pickerToField.value) {
                withinRange = date < this.pickerToField.value;
            }
            return withinRange && defaultFilterPredicate(data, filterValue);
        };
    }

    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue || 'burst';
    }

    public isOwnAccount(address: string): boolean {
        return address !== undefined && address === this.account.address;
    }

    public convertTimestamp(timestamp: number): Date {
        return Converter.convertTimestampToDate(timestamp);
    }

    public getTransactionNameFromType(transaction: Transaction) {
        return this.utilService.getTransactionNameFromType(transaction, this.account);
    }
}
