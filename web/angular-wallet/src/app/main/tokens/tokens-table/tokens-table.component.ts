import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import { TokenData } from '../../../shared/services/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from 'app/app.service';
import { WalletAccount } from "app/util/WalletAccount";

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
export class TokensTableComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges, AfterViewInit {
  @Input() public tokens: TokenData[] = [];
  @Input() public isLoading = true;
  @Input() public account: WalletAccount;
  @Input() public displayedColumns = ['token', 'balance', 'lastPrice', 'supply', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<TokenData>();
  public locale: string;

  constructor(private storeService: StoreService, private appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.storeService.settingsUpdated$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({language}) => {
        this.locale = language;
      });

  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  private update(): void {
    this.dataSource.data = this.tokens;
    // this.dataSource.paginator = this.paginator;
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
    const  {networkName} = this.storeService.getSelectedNode();
    const url = networkName === 'Signum' ? `https://www.signumswap.com/tokens/${id}` : `https://test.signumswap.com/tokens/${id}`;
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }
}
