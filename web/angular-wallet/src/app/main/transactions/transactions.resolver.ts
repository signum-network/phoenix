import {Injectable} from '@angular/core';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Transaction} from '@signumjs/core';
import {AccountService} from 'app/setup/account/account.service';
import { uniqBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TransactionsResolver implements Resolve<Promise<Transaction[]>> {
  constructor(private accountService: AccountService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Transaction[]> {
    try {
      const account = this.accountService.currentAccount.getValue();
      const accountId = route.params.id || account.account;
      let transactions: Transaction[] = [];
      if (route.params.id) {
        const transactionList = await this.accountService.getAccountTransactions({accountId});
        transactions = transactionList.transactions;
      } else {
        await this.accountService.syncAccountTransactions(account);
        transactions = account.transactions;
      }
      const {unconfirmedTransactions} = await this.accountService.getUnconfirmedTransactions(accountId);
      return uniqBy(unconfirmedTransactions.concat(transactions), 'transaction');
    } catch (e) {
      console.warn(e);
    }
  }
}
