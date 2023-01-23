import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction } from '@signumjs/core';
import { ApiService } from 'app/api.service';

@Injectable()
export class TransactionResolver implements Resolve<Promise<Transaction>> {
  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Transaction> {
    return this.apiService.ledger.transaction.getTransaction(route.paramMap.get('id'));
  }
}
