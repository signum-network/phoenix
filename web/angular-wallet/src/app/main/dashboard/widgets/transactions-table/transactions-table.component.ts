import { Component, Input, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Account, Transaction} from '@signumjs/core';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../../util/UnsubscribeOnDestroy';
import {AccountService} from '../../../../setup/account/account.service';

@Component({
  selector: 'app-transactions-table-widget',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent extends UnsubscribeOnDestroy implements OnInit {

  @Input() displayedColumns: string[] = undefined;

  transactionsDataSource = new MatTableDataSource<Transaction>();
  account: Account;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private accountService: AccountService,
  ) {
    super();
  }

  ngOnInit(): void {

    this.accountService.currentAccount$
      .pipe(this.unsubscribe)
      .subscribe((account: Account) => {
          this.account = account;
          this.transactionsDataSource.data = account.transactions.slice(0, 10);
        }
      );

  }

}
