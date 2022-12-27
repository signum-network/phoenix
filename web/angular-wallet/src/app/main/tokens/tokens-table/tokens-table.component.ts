import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import { TokenData } from '../../../shared/services/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from '../../../app.service';

const DummyTokenData: TokenData = {
  id: '',
  balance: 0,
  name: '',
  supply: 0,
  priceInfo: {change: 0, amount: ''},
  description: '',
  decimals: 0,
  total: 0
};

@Component({
  selector: 'app-tokens-table',
  templateUrl: './tokens-table.component.html',
  styleUrls: ['./tokens-table.component.scss']
})
export class TokensTableComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {
  @Input() public tokens: TokenData[] = [];
  @Input() public showActions = true;
  @Input() public isLoading = true;
  @Input() public displayedColumns = ['token', 'balance', 'lastPrice', 'supply', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<TokenData>();
  public locale: string;

  constructor(private storeService: StoreService, private appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({language}) => {
        this.locale = language;
      });

    this.update();
  }
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  private update(): void {
    this.dataSource.data = this.isLoading ? [DummyTokenData, DummyTokenData, DummyTokenData] : this.tokens;
    if (!this.showActions) {
      this.displayedColumns = this.displayedColumns.filter(c => c !== 'actions');
    }
  }

  ngOnChanges(): void {
    this.update();
  }

  getTrend(change: number): string {
    if (change > 0) {
      return 'trend-up';
    }
    if (change < 0) {
      return 'trend-down';
    }
    return 'trend-flat';
  }

  getShare(token: TokenData): number {
    return token.balance / token.supply;
  }

  openSignumSwap(id: string): void {
    const url = `https://www.signumswap.com/tokens/${id}`;
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }
}
