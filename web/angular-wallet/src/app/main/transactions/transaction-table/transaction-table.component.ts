import {Component, Input, OnInit, ViewChild, ChangeDetectionStrategy, AfterViewInit} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {
  Transaction,
  Account,
  isMultiOutSameTransaction,
  isMultiOutTransaction, getRecipientsAmount
} from '@burstjs/core';
import {convertBurstTimeToDate, convertNQTStringToNumber} from '@burstjs/util';
import {UtilService} from 'app/util.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {StoreService} from '../../../store/store.service';

@Component({
  selector: 'app-transaction-table',
  styleUrls: ['./transaction-table.component.scss'],
  templateUrl: './transaction-table.component.html',
})
export class TransactionTableComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {

  public locale: string;

  constructor(private utilService: UtilService,
              private storeService: StoreService,
              private route: ActivatedRoute) {
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
  private account: Account;

  @Input() dataSource: MatTableDataSource<Transaction>;
  @Input() public displayedColumns = ['transaction_id', 'attachment', 'timestamp', 'type', 'amount', 'fee', 'account', 'confirmations'];
  @Input() paginationEnabled = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public isMultiOutPayment(transaction: Transaction): boolean {
    return isMultiOutSameTransaction(transaction) || isMultiOutTransaction(transaction)
  }

  public ngOnInit(): void {
    this.account = this.route.snapshot.data.account;
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public convertTimestamp(timestamp: number): Date {
    return convertBurstTimeToDate(timestamp);
  }

  public getTransactionNameFromType(transaction: Transaction): string {
    return this.utilService.translateTransactionType(transaction, this.account);
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
    return this.isOwnAccount(transaction.senderRS);
  }
}
