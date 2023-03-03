import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction } from '@signumjs/core';
import { LedgerService } from 'app/ledger.service';
import { expMemo } from 'app/util/memo';
import { StoreService } from 'app/store/store.service';

const fetchTransaction = expMemo((key: string, txId: string, ledgerService: LedgerService) => {

  if (/^[0-9a-fA-F]{64}$/.test(txId))
  {
    return ledgerService.ledger.transaction.getTransactionByFullHash(txId);
  }

  return ledgerService.ledger.transaction.getTransaction(txId);
}, { expiry: 120_000 });


@Injectable()
export class TransactionResolver implements Resolve<Promise<Transaction>> {
  constructor(private ledgerService: LedgerService, private storeService: StoreService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Transaction> {
    try{
      const {networkName} = this.storeService.getSelectedNode();
      const txId = route.params.id;
      const cacheKey = `${networkName}-${txId}`;
      return (await fetchTransaction(cacheKey, txId, this.ledgerService) );
    } catch (e) {
      console.warn('Transaction not found', e.message);
      return null;
    }
  }
}
