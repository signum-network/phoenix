import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Account} from '@signumjs/core';
import {TokenData} from '../token.service';
import {Amount} from '@signumjs/util';


@Component({
  selector: 'app-tokens-table',
  templateUrl: './tokens-table.component.html',
  styleUrls: ['./tokens-table.component.scss']
})
export class TokensTableComponent implements OnInit, OnChanges {
  @Input() public tokens: TokenData[] = [];
  @Input() public displayedColumns = ['token', 'balance', 'lastPrice'];
  @Input() public account: Account;
  @Input() public isLoading = false;

  public dataSource = new MatTableDataSource<TokenData>();

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = this.tokens;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.tokens;
  }

  // // public ngAfterViewInit() {
  // //   this.dataSource.sort = this.sort;
  // }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getTrend(change: number): string {
    if (change > 0) { return 'trend-up'; }
    if (change < 0) { return 'trend-down'; }
    return 'trend-flat';
  }
}
