import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Transaction, Account } from '@burstjs/core';
import { Converter } from '@burstjs/crypto';
import { FormControl } from '@angular/forms';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';

@Component({
    selector: 'app-transactions',
    styleUrls: ['./transactions.component.scss'],
    templateUrl: './transactions.component.html'
})
export class TransactionsComponent {
    public dataSource: MatTableDataSource<Transaction>;
    public displayedColumns: string[];
    private account: Account;
    pickerFromField = new FormControl();
    pickerToField = new FormControl();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private accountService: AccountService,
        private storeService: StoreService,
        private dialog: MatDialog
    ) {}

    public async ngOnInit() {
        this.displayedColumns = ['transaction_id', 'attachment', 'timestamp', 'type', 'amount', 'fee', 'account', 'confirmed'];
        this.dataSource = new MatTableDataSource<Transaction>();
        this.account = await this.storeService.getSelectedAccount()
        this.accountService.getAccountTransactions(this.account.id).then(transactions => {
            console.log(transactions);
            if (transactions.errorCode) {
                // temporary
                transactions = [{
                    id: '17134635898950935218', attachment: '123', timestamp: new Date(), type: '123', amountNQT: '12345', feeNQT: '123'
                }];
                console.log(transactions.errorDescription);
            }
            this.dataSource.data = transactions;
        })
    }

    public ngAfterViewInit() {
        const defaultFilterPredicate = this.dataSource.filterPredicate;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filterValue: string) => {
            let withinRange = true;
            if (this.pickerFromField.value && this.pickerToField.value) {
                withinRange = this.convertTimestamp(parseFloat(data.timestamp)) > this.pickerFromField.value &&
                this.convertTimestamp(parseFloat(data.timestamp)) < this.pickerToField.value;
            } else if (this.pickerFromField.value) {
                withinRange = this.convertTimestamp(parseFloat(data.timestamp)) > this.pickerFromField.value;
            } else if (this.pickerToField.value) {
                withinRange = this.convertTimestamp(parseFloat(data.timestamp)) < this.pickerToField.value;
            }
            return withinRange && defaultFilterPredicate(data, filterValue);
        }
    }

    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue || "burst";
    }

    public isOwnAccount(address: string): boolean {
        return address != undefined && address == this.account.address;
    }

    public convertTimestamp(timestamp: number): Date {
        return Converter.convertTimestampToDate(timestamp);
    }

    public getTransactionNameFromType() {
        return `coming soon`;
    }
}
