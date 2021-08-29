import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TokenData} from '../token.service';

@Component({
  selector: 'app-tokens-table',
  templateUrl: './tokens-table.component.html',
  styleUrls: ['./tokens-table.component.scss']
})
export class TokensTableComponent implements OnInit, OnChanges {
  @Input() public tokens: TokenData[] = [];
  @Input() public displayedColumns = ['token', 'balance', 'lastPrice'];

  public dataSource = new MatTableDataSource<TokenData>();

  ngOnInit(): void {
    this.dataSource.data = this.tokens;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.tokens;
  }

  getTrend(change: number): string {
    if (change > 0) { return 'trend-up'; }
    if (change < 0) { return 'trend-down'; }
    return 'trend-flat';
  }
}
