import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Transaction, Account} from '@burstjs/core';
import {BlockTime} from '@burstjs/util';

@Component({
  selector: 'app-transactions',
  styleUrls: ['./transactions.component.scss'],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<Transaction>;
  public account: Account;
  pickerFromField = new FormControl();
  pickerToField = new FormControl();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Transaction>();
    this.dataSource.data = this.route.snapshot.data.transactions;
    this.account = this.route.snapshot.data.account;
  }

  public ngAfterViewInit(): void {
    const defaultFilterPredicate = this.dataSource.filterPredicate;
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

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue || 'burst';
  }

  public convertTimestamp(timestamp: number): Date {
    return BlockTime.fromBlockTimestamp(timestamp).getDate();
  }
}
