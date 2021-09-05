import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TokenData} from '../token.service';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-tokens-table',
  templateUrl: './tokens-table.component.html',
  styleUrls: ['./tokens-table.component.scss']
})
export class TokensTableComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {
  @Input() public tokens: TokenData[] = [];
  @Input() public showActions = true;
  @Input() public displayedColumns = ['token', 'balance', 'lastPrice', 'supply', 'actions'];

  public dataSource = new MatTableDataSource<TokenData>();
  public locale: string;

  constructor(private storeService: StoreService) {
    super();
  }

  ngOnInit(): void {
    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe( ({language}) => {
      this.locale = language;
    });
    this.dataSource.data = this.tokens;

    if(!this.showActions){
      this.displayedColumns = this.displayedColumns.filter( c => c !== 'actions')
    }
  }

  ngOnChanges(): void {
    this.dataSource.data = this.tokens;
  }

  getTrend(change: number): string {
    if (change > 0) { return 'trend-up'; }
    if (change < 0) { return 'trend-down'; }
    return 'trend-flat';
  }

  getShare(token: TokenData): number {
    return  token.balance / token.supply;
  }
}
