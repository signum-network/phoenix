import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction } from '@signumjs/core';
import { ApiService } from 'app/api.service';
import { AccountManagementService } from '../../shared/services/account-management.service';

@Injectable()
export class TransactionResolver implements Resolve<Promise<Transaction>> {
  constructor(private apiService: ApiService, private accountManagementService: AccountManagementService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Transaction> {
    const selectedAccount =  this.accountManagementService.getSelectedAccount();
    if (selectedAccount){
      const tx = selectedAccount.transactions.find( ({transaction}) => transaction === route.params.id);
      if (tx){
        return Promise.resolve(tx);
      }
    }
    return this.apiService.ledger.transaction.getTransaction(route.params.id);
  }
}
