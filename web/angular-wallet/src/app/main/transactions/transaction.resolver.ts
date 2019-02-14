import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TransactionService } from './transaction.service';
import { Transaction } from '@burstjs/core';

@Injectable()
export class TransactionResolver implements Resolve<Promise<Transaction>> {
  constructor(private transactionService: TransactionService) {
      this.transactionService = transactionService;
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.transactionService.getTransaction(route.paramMap.get('id'));
  }
}