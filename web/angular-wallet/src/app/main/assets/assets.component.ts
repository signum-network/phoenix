import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { Account, Asset } from '@burstjs/core';
import { AssetBalance } from '@burstjs/core/out/typings/assetBalance';

interface AssetRow {
  name: string;
  description: string;
  amount: string;
  decimals: number;
}

@Component({
  selector: 'app-assets',
  styleUrls: ['./assets.component.scss'],
  templateUrl: './assets.component.html'
})
export class AssetsComponent implements OnInit {
  public dataSource: MatTableDataSource<AssetRow>;
  public displayedColumns: string[];
  public selectedAccount: Account;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    public router: Router
  ) { }

  ngOnInit (): void {
    this.displayedColumns = ['name', 'decimals', 'amount'];
    this.dataSource = new MatTableDataSource<AssetRow>();
    
    this.storeService.ready.subscribe(async (ready) => {
      const output = [];
      try {
        this.selectedAccount = await this.storeService.getSelectedAccount();
        for (const assetBalance in this.selectedAccount.assetBalances) {
          if (this.selectedAccount.assetBalances[assetBalance]) {
            const { asset, balanceQNT } = this.selectedAccount.assetBalances[assetBalance];
            const assetResponse = await this.accountService.getAsset(asset);
            output.push({
              name: assetResponse.name,
              description: assetResponse.description,
              decimals: assetResponse.decimals,
              amount: balanceQNT
            });
          }
        }
      } catch (e) {
        console.warn(e);
      }
      this.dataSource.data = output;
    });
  }

  openDialog(): void {
  }

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
