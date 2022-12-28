import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { Address, Alias } from '@signumjs/core';
import { WalletAccount } from 'app/util/WalletAccount';
import { ChainTime } from '@signumjs/util';
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { UnsubscribeOnDestroy } from '../../util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { isTextIsSrc44 } from '../../util/isTextIsSrc44';
import { isTextIsJson } from '../../util/isTextIsJson';


const ColumnsQuery = {
  xl: ['name', 'timestamp', 'content', 'status', 'price', 'buyer', 'actions'],
  lg: ['name', 'timestamp', 'content', 'status', 'price', 'buyer', 'actions'],
  md: ['name', 'timestamp', 'content', 'status', 'price', 'buyer', 'actions'],
  sm: ['name', 'timestamp', 'content', 'status', 'actions'],
  xs: ['name', 'timestamp', 'content', 'actions']
};

interface AliasData {
  name: string;

  timestamp: number;
  id: string;
  content: string;
  pricePlanck?: string;
  buyer?: string;
  status: 'alias_off_sale' | 'alias_on_sale_public' | 'alias_on_sale_private';
}

@Component({
  selector: 'app-aliases',
  styleUrls: ['./aliases.component.scss'],
  templateUrl: './aliases.component.html'
})
export class AliasesComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public searchField = new FormControl('');


  public dataSource: MatTableDataSource<AliasData>;
  public displayedColumns: string[];
  public selectedAccount: WalletAccount;

  public watchOnly = false;
  unsubscriber = takeUntil(this.unsubscribeAll);
  private locale: string;

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    public router: Router,
    private observableMedia: MediaObserver
  ) {
    super();
  }

  getDate(alias: AliasData): string {
    try {
      const time = ChainTime.fromChainTimestamp(alias.timestamp);
      return formatDate(time.getDate(), 'shortDate', this.locale);
    } catch (e) {
      return '';
    }
  }

  public ngOnInit(): void {
    this.displayedColumns = ColumnsQuery.xl;
    this.dataSource = new MatTableDataSource<AliasData>();

    this.storeService.settings
      .pipe(this.unsubscriber)
      .subscribe(({ language }) => {
        this.locale = language;
      });

    this.storeService.ready
      .pipe(this.unsubscriber)
      .subscribe(async (ready) => {
        if (ready) {
          this.selectedAccount = await this.storeService.getSelectedAccount();
          this.watchOnly = this.selectedAccount && this.selectedAccount.type === 'offline';
          await this.fetchAliases();
        }
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.observableMedia.asObservable()
      .pipe(this.unsubscriber)
      .subscribe((change: MediaChange[]) => {
        this.displayedColumns = ColumnsQuery[change[0].mqAlias];
      });
  }


  private async fetchAliases(): Promise<void> {
    try {
      const { aliases } = await this.accountService.getAliases(this.selectedAccount.account);
      this.dataSource.data = aliases.map((a) => {
        const result: AliasData = {
          name: a.aliasName,
          timestamp: a.timestamp,
          id: a.alias,
          content: a.aliasURI,
          pricePlanck: a.priceNQT,
          buyer: a.buyer,
          status: 'alias_off_sale'
        };

        if (a.priceNQT) {
          result.status = 'alias_on_sale_public';
        }
        if (a.buyer) {
          result.status = 'alias_on_sale_private';
        }

        return result;
      });
    } catch (e) {
      console.warn(e.message);
    }
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public getContentFormat(content: string): string {
    let format = 'custom';
    if (isTextIsJson(content)) {
      format = 'json';
    }

    // most relevant.... so it comes last
    if (isTextIsSrc44(content)) {
      format = 'src44';
    }
    return format;
  }

  toAddress(buyer: string): string {
    if (buyer) {
      try {
        return Address.fromNumericId(buyer).getReedSolomonAddress(false);
      } catch (e) {
        return '';
      }
    }
    return '';
  }
}
