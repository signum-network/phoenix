import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '@signumjs/core';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { WalletAccount } from 'app/util/WalletAccount';
import { StoreService } from 'app/store/store.service';
import { LedgerService } from 'app/ledger.service';
import { uniqBy } from 'lodash';

@Component({
  selector: 'app-transactions-table-widget',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent extends UnsubscribeOnDestroy implements OnInit {

  @Input() account: WalletAccount;

  transactionsDataSource = new MatTableDataSource<Transaction>();
  isLoading = false;
  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private storeService: StoreService,
    private ledgerService: LedgerService
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

  async refreshTransactions(): Promise<void> {
    try{
      this.isLoading = true;
      const [pending, confirmed] = await Promise.all([
        this.ledgerService.ledger.account.getUnconfirmedAccountTransactions(this.account.account),
        await this.ledgerService.ledger.account.getAccountTransactions({
          accountId: this.account.account,
          resolveDistributions: true,
          includeIndirect: true,
        })
      ]);
      const prunedTransactions = uniqBy([...pending.unconfirmedTransactions, ...confirmed.transactions], 'transaction');
      prunedTransactions.sort((a, b) => b.timestamp - a.timestamp);
      this.account.transactions = prunedTransactions;
      this.storeService.saveAccount(this.account);
    }catch (e){
      console.error('err', e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
