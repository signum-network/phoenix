import {Component, OnInit} from '@angular/core';
import {
  Account,
  Transaction} from '@burstjs/core';
import {StoreService} from 'app/store/store.service';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../../../util.service';
import {AccountService} from 'app/setup/account/account.service';
import {CellValueMapper} from './cell-value-mapper';

interface TransactionDetailRow {
  k: string;
  v: string;
}

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  infoRows = ['transactionType', 'attachment', 'amountNQT', 'feeNQT', 'senderAddress', 'recipientAddress'];
  public detailsData: TransactionDetailRow[] = [];
  account: Account;
  transaction: Transaction;
  recipient: Account;
  private cellValueMapper: CellValueMapper;

  constructor(
    private storeService: StoreService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private accountService: AccountService) {
  }

  public getFieldNameFromField(field: string): string {
    return this.utilService.translateTransactionField(field);
  }

  trackRows(index, row): any {
    return row ? row.id : undefined;
  }

  async ngOnInit(): Promise<void> {
    this.transaction = this.route.snapshot.data.transaction as Transaction;
    this.accountService.getAccount(this.transaction.recipient).then( recipient => this.recipient = recipient);

    this.account = await this.storeService.getSelectedAccount();
    this.cellValueMapper = new CellValueMapper(this.transaction, this.account, this.utilService);

    this.detailsData = Object
      .keys(this.transaction)
      .map(k => ({k, v: this.cellValueMapper.getValue(k).value}));
  }

  currentAccountIsSender(): boolean {
    return this.account && this.transaction.senderRS === this.account.accountRS;
  }

}
