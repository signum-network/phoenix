import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Transaction} from '@burstjs/core';
import {FormControl} from '@angular/forms';
import {convertBurstTimeToDate, convertNQTStringToNumber} from '@burstjs/util';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transactions',
  styleUrls: ['./transactions.component.scss'],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent {
  public dataSource: MatTableDataSource<Transaction>;
  public convertNQTStringToNumber = convertNQTStringToNumber;
  pickerFromField = new FormControl();
  pickerToField = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  public async ngOnInit() {
    this.dataSource = new MatTableDataSource<Transaction>();
    this.dataSource.data = this.route.snapshot.data.transactions;
  }

  public ngAfterViewInit() {
    const defaultFilterPredicate = this.dataSource.filterPredicate;
    // this.dataSource.paginator = this.paginator;
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

  public convertTimestamp(timestamp: number): Date {
    return convertBurstTimeToDate(timestamp);
  }
}
