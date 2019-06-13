import {Injectable} from '@angular/core';

import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Transaction} from '@burstjs/core';
import {AccountService} from 'app/setup/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsResolver implements Resolve<Promise<Transaction[]>> {
  constructor(private accountService: AccountService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Transaction[]> {
    const account = route.params.id || this.accountService.currentAccount.getValue().account;
    try {
      const unconfirmedTransactions = await this.accountService.getUnconfirmedTransactions(account);
      const transactions = await this.accountService.getAccountTransactions(account, 0, 500);
      return unconfirmedTransactions.unconfirmedTransactions.concat(transactions.transactions);
    } catch (e) {
      console.warn(e);
    }
  }
}
