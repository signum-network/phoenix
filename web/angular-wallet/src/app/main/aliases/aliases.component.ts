import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { Account, Alias } from '@burstjs/core';

@Component({
  selector: 'app-aliases',
  styleUrls: ['./aliases.component.scss'],
  templateUrl: './aliases.component.html'
})
export class AliasesComponent {
  public dataSource: MatTableDataSource<Alias>;
  public displayedColumns: string[];
  public selectedAccount: Account;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    public router: Router
  ) { }

  public ngOnInit() {
    this.displayedColumns = ['aliasName', 'aliasURI', 'status', 'actions'];
    this.dataSource = new MatTableDataSource<Alias>();

    this.storeService.ready.subscribe(async (ready) => {
      this.selectedAccount = await this.storeService.getSelectedAccount();
      const aliasesResponse = await this.accountService.getAliases(this.selectedAccount.account);
      this.dataSource.data = aliasesResponse.aliases;
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
