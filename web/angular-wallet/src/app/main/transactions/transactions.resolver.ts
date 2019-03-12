import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TransactionService } from './transaction.service';
import { Transaction } from '@burstjs/core';
import { AccountService } from 'app/setup/account/account.service';

@Injectable()
export class TransactionsResolver implements Resolve<Promise<Transaction>> {
  constructor(private accountService: AccountService) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      const transactions = await this.accountService.getAccountTransactions(this.accountService.currentAccount.getValue().account);
      return transactions;
    } catch (e) {
      console.warn(e);
    }
  }
}