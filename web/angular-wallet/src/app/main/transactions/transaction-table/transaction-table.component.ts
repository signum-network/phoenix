import {
  Component,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {
  Transaction,
  Account,
  isMultiOutSameTransaction,
  isMultiOutTransaction,
  getRecipientsAmount,
  TransactionMiningSubtype,
  TransactionType
} from '@signumjs/core';
import {Amount, BlockTime} from '@signumjs/util';
import {UtilService} from 'app/util.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {StoreService} from '../../../store/store.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-transaction-table',
  styleUrls: ['./transaction-table.component.scss'],
  templateUrl: './transaction-table.component.html',
})
export class TransactionTableComponent extends UnsubscribeOnDestroy implements AfterViewInit {
  public locale: string;

  constructor(private utilService: UtilService,
              private storeService: StoreService) {
    super();
    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(({language}) => {
        this.locale = language;
      });
  }

  @Input() dataSource: MatTableDataSource<Transaction>;
  @Input() public displayedColumns = ['transaction_id', 'attachment', 'timestamp', 'type', 'amount', 'fee', 'account', 'confirmations'];
  @Input() paginationEnabled = true;
  @Input() account: Account;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public isMultiOutPayment(transaction: Transaction): boolean {
    return isMultiOutSameTransaction(transaction) || isMultiOutTransaction(transaction);
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public convertTimestamp(timestamp: number): Date {
    return BlockTime.fromBlockTimestamp(timestamp).getDate();
  }

  public getTransactionNameFromType(transaction: Transaction): string {
    return this.utilService.translateTransactionSubtype(transaction, this.account);
  }

  public isOwnAccount(address: string): boolean {
    return address && address === this.account.accountRS;
  }

  public getAmount(transaction: Transaction): string {

    if (this.isOwnAccount(transaction.senderRS)) {
      return Amount.fromPlanck(transaction.amountNQT).multiply(-1).getSigna();
    }

    return this.isMultiOutPayment(transaction)
      ? getRecipientsAmount(this.account.account, transaction).toString(10)
      : Amount.fromPlanck(transaction.amountNQT).getSigna();
  }

  public isAmountNegative(transaction: Transaction): boolean {
    const isZero = parseFloat(transaction.amountNQT) === 0;
    return !isZero && this.isOwnAccount(transaction.senderRS);
  }

  public isCommitment(transaction: Transaction): boolean {
    return transaction.type === TransactionType.Mining && (
      transaction.subtype === TransactionMiningSubtype.AddCommitment ||
      transaction.subtype === TransactionMiningSubtype.RemoveCommitment
    );
  }

  getCommitmentAmount(transaction): string {
    return Amount.fromPlanck(transaction.attachment.amountNQT || '0').getSigna();
  }

  getDate(tx: Transaction): string {
    const time = BlockTime.fromBlockTimestamp(tx.timestamp);
    return formatDate(time.getDate(), 'short', this.locale);
  }

  getRowClass(row: Transaction): string {

    const cx = className => !row.confirmations ? `${className} unconfirmed` : className;

    if (
      (!row.recipient && (row.type !== TransactionType.Payment)) ||
      (row.recipient === this.account.account && row.sender === this.account.account)
    ) {
      return cx('self');
    }

    if (
      (row.recipient === this.account.account && row.sender !== this.account.account) ||
      (!row.recipient && (row.type === TransactionType.Payment)) //
    ) {
      return cx('incoming');
    }

    return cx('outgoing');
  }
}
