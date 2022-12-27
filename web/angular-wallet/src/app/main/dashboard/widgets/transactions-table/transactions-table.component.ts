import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '@signumjs/core';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { AccountService } from '../../../../setup/account/account.service';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-transactions-table-widget',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent extends UnsubscribeOnDestroy implements OnInit {

  @Input() displayedColumns: string[] = undefined;

  transactionsDataSource = new MatTableDataSource<Transaction>();
  account: WalletAccount;

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private accountService: AccountService
  ) {
    super();
  }

  ngOnInit(): void {

    this.accountService.currentAccount$
      .pipe(this.unsubscribe)
      .subscribe((account: WalletAccount) => {
          this.account = account;
          this.transactionsDataSource.data = account.transactions.slice(0, 10);
        }
      );

  }

}
