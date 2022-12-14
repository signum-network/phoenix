import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { Alias } from '@signumjs/core';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-aliases',
  styleUrls: ['./aliases.component.scss'],
  templateUrl: './aliases.component.html'
})
export class AliasesComponent {
  public dataSource: MatTableDataSource<Alias>;
  public displayedColumns: string[];
  public selectedAccount: WalletAccount;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    public router: Router
  ) { }

  public ngOnInit(): void {
    this.displayedColumns = ['aliasName', 'aliasURI', 'status'];
    this.dataSource = new MatTableDataSource<Alias>();

    this.storeService.ready.subscribe(async (ready) => {
      try {
        this.selectedAccount = await this.storeService.getSelectedAccount();
        const aliasesResponse = await this.accountService.getAliases(this.selectedAccount.account);
        this.dataSource.data = aliasesResponse.aliases;
      } catch (e) {
        console.warn(e);
      }
    });
  }

  openDialog(): void {
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
