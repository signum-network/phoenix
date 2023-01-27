import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'app/store/store.service';
import { Address } from '@signumjs/core';
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
import { AliasService } from './alias.service';


const ColumnsQuery = {
  xl: ['name', 'owner', 'timestamp', 'content', 'status', 'price', 'buyer', 'actions'],
  lg: ['name', 'owner', 'timestamp', 'content', 'status', 'price', 'buyer', 'actions'],
  md: ['name', 'owner', 'timestamp', 'content', 'status', 'price', 'buyer', 'actions'],
  sm: ['name', 'content', 'status', 'price', 'actions'],
  xs: ['name', 'price', 'actions']
};

interface AliasData {
  name: string;

  owner: string;
  timestamp: number;
  id: string;
  content: string;
  pricePlanck?: string;
  buyer?: string;
  status: 'alias_off_sale' | 'alias_on_sale_public' | 'alias_on_sale_private';
  isDirectOffer: boolean;
}

@Component({
  selector: 'app-aliases',
  styleUrls: ['./aliases.component.scss'],
  templateUrl: './aliases.component.html'
})
export class AliasesComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public searchField = new FormControl('');

  public dataSource = new MatTableDataSource<AliasData>();
  public displayedColumns: string[];
  public account: WalletAccount;

  public watchOnly = false;
  unsubscriber = takeUntil(this.unsubscribeAll);
  private locale: string;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private aliasService: AliasService,
    private  router: Router,
    private cdr: ChangeDetectorRef,
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

  public async ngOnInit(): Promise<void> {
    this.displayedColumns = ColumnsQuery.xl;
    this.account = this.route.snapshot.data.account;
    this.watchOnly = this.account && this.account.type === 'offline';
    this.storeService.languageSelected$
      .pipe(this.unsubscriber)
      .subscribe((language: string) => {
        this.locale = language;
      });
    await this.fetchAliases();

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
      const [own, offers] = await Promise.all([
        this.aliasService.getAliases(this.account.account),
        this.aliasService.getAliasesDirectOffers(this.account.account),
      ]);
      this.dataSource.data = [...offers.aliases, ...own.aliases].map((a) => {
        const result: AliasData = {
          owner: a.account,
          name: a.aliasName,
          timestamp: a.timestamp,
          id: a.alias,
          content: a.aliasURI,
          pricePlanck: a.priceNQT,
          buyer: a.buyer,
          status: 'alias_off_sale',
          isDirectOffer: a.buyer === this.account.account
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

  canBuy(alias: AliasData): boolean {
    if (alias.status === 'alias_on_sale_private') {
      return alias.buyer === this.account.account;
    }
    return false;
  }

  canEdit(alias: AliasData): boolean {
    return alias.owner === this.account.account;
  }

  canCancel(alias: AliasData): boolean {
    return alias.status !== 'alias_off_sale' && alias.owner === this.account.account;
  }

  canSell(alias: AliasData): boolean {
    return alias.status === 'alias_off_sale' && alias.owner === this.account.account;
  }
}
