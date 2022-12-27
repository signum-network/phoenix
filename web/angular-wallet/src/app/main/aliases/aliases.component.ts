import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { Address, Alias } from '@signumjs/core';
import { WalletAccount } from 'app/util/WalletAccount';
import { Amount } from '@signumjs/util';
import { DescriptorData } from '@signumjs/standards';
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { UnsubscribeOnDestroy } from "../../util/UnsubscribeOnDestroy";
import { takeUntil } from "rxjs/operators";


const ColumnsQuery = {
  xl: ['name', 'content', 'status', 'price', 'buyer', 'actions'],
  lg: ['name', 'content', 'status', 'price', 'buyer', 'actions'],
  md: ['name', 'content', 'status', 'price', 'buyer', 'actions'],
  sm: ['name', 'content', 'status', 'actions'],
  xs: ['name', 'content', 'actions'],
};

interface AliasData {
  name: string;
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
export class AliasesComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  public dataSource: MatTableDataSource<AliasData>;
  public displayedColumns: string[];
  public selectedAccount: WalletAccount;
  unsubscriber = takeUntil(this.unsubscribeAll);

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    public router: Router,
    private observableMedia: MediaObserver
  ) {
    super()
  }


  static isFormatSRC(text: string): boolean {
    try {
      DescriptorData.parse(text, false);
      return true;
    } catch (e) {
      return false;
    }
  }

  static isFormatJson(text: string): boolean {
    try {
      JSON.parse(text);
      return true;
    } catch (e) {
      return false;
    }
  }

  public ngOnInit(): void {
    this.displayedColumns = ColumnsQuery.xl;
    this.dataSource = new MatTableDataSource<AliasData>();

    this.storeService.ready
      .pipe(this.unsubscriber)
      .subscribe(async (ready) => {
      if (ready) {
        this.selectedAccount = await this.storeService.getSelectedAccount();
        await this.fetchAliases();
      }
    });
  }

  openDialog(): void {
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
    try{
      const { aliases } = await this.accountService.getAliases(this.selectedAccount.account);
      this.dataSource.data = aliases.map((a) => {
        const result: AliasData = {
          name: a.aliasName,
          id: a.alias,
          content: a.aliasURI,
          pricePlanck: a.priceNQT,
          buyer: a.buyer,
          status: 'alias_off_sale',
        };

        if (a.priceNQT){
          result.status = 'alias_on_sale_public';
        }
        if (a.buyer){
          result.status = 'alias_on_sale_private';
        }

        return result;
      });
    } catch (e){
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
    if (AliasesComponent.isFormatJson(content)) {
      format = 'json';
    }

    // most relevant.... so it comes last
    if (AliasesComponent.isFormatSRC(content)) {
      format = 'src44';
    }
    return format;
  }

  toAddress(buyer: string): string {
    if (buyer){
      try{
        return Address.fromNumericId(buyer).getReedSolomonAddress(false);
      }
      catch (e){
        return '';
      }
    }
    return '';
  }
}
