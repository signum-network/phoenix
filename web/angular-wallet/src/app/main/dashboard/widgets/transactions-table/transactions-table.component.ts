import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '@signumjs/core';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { WalletAccount } from 'app/util/WalletAccount';
import { StoreService } from 'app/store/store.service';

@Component({
  selector: 'app-transactions-table-widget',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent extends UnsubscribeOnDestroy implements OnInit {

  @Input() displayedColumns: string[] = undefined;
  @Input() account: WalletAccount;

  transactionsDataSource = new MatTableDataSource<Transaction>();

  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private storeService: StoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.transactionsDataSource.data = this.account.transactions.slice(0, 10);
    this.storeService.accountUpdated$
      .pipe(this.unsubscribe)
      .subscribe((account: WalletAccount) => {
          this.account = account;
          this.transactionsDataSource.data = account.transactions.slice(0, 10);
        }
      );

  }

}
