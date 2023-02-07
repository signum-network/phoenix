import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction } from '@signumjs/core';
import { AccountManagementService } from '../../shared/services/account-management.service';
import { LedgerService } from 'app/ledger.service';

@Injectable()
export class TransactionResolver implements Resolve<Promise<Transaction>> {
  constructor(private ledgerService: LedgerService, private accountManagementService: AccountManagementService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Transaction> {
    const selectedAccount =  this.accountManagementService.getSelectedAccount();
    if (selectedAccount){
      const tx = selectedAccount.transactions.find( ({transaction}) => transaction === route.params.id);
      if (tx){
        return Promise.resolve(tx);
      }
    }
    try{
      return (await this.ledgerService.ledger.transaction.getTransaction(route.params.id));
    } catch (e){
      console.warn('Transaction not found', e.message);
      return null;
    }
  }
}
