import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TransactionService } from './transaction.service';
import { Transaction } from '@burstjs/core';
import { AccountService } from 'app/setup/account/account.service';

@Injectable()
export class TransactionsResolver implements Resolve<Promise<Transaction>> {
  constructor(private accountService: AccountService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.accountService.getAccountTransactions(this.accountService.currentAccount.getValue().id);
  }
}