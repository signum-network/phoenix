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
} from '@burstjs/core';
import {convertBurstTimeToDate, convertNQTStringToNumber, BurstValue} from '@burstjs/util';
import {UtilService} from 'app/util.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {StoreService} from '../../../store/store.service';
import {TransactionPaymentSubtype} from '@burstjs/core/src';

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

  public convertNQTStringToNumber = convertNQTStringToNumber;

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
    return convertBurstTimeToDate(timestamp);
  }

  public getTransactionNameFromType(transaction: Transaction): string {
    return this.utilService.translateTransactionSubtype(transaction, this.account);
  }

  public isOwnAccount(address: string): boolean {
    return address && address === this.account.accountRS;
  }

  public getAmount(transaction: Transaction): number {

    if (this.isOwnAccount(transaction.senderRS)) {
      return -this.convertNQTStringToNumber(transaction.amountNQT);
    }

    return this.isMultiOutPayment(transaction)
      ? getRecipientsAmount(this.account.account, transaction)
      : this.convertNQTStringToNumber(transaction.amountNQT);
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
    return BurstValue.fromPlanck(transaction.attachment.amountNQT || '0').getBurst();
  }

  getTransactionDirection(row: Transaction): string {

    if (
      (!row.recipient && (row.type !== TransactionType.Payment)) ||
      (row.recipient === this.account.account && row.sender === this.account.account)
    ) {
      return 'self';
    }

    if (
      (row.recipient === this.account.account && row.sender !== this.account.account) ||
      (!row.recipient && (row.type === TransactionType.Payment)) //
    ) {
      return 'incoming';
    }

    return 'outgoing';
  }
}
