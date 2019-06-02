import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
import {AccountService} from 'app/setup/account/account.service';

@Component({
  selector: 'app-transaction-table',
  styleUrls: ['./transaction-table.component.scss'],
  templateUrl: './transaction-table.component.html',
})
export class TransactionTableComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit, OnChanges {
  public locale: string;

  constructor(private utilService: UtilService,
              private storeService: StoreService,
              private route: ActivatedRoute,
              private accountService: AccountService) {
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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public isMultiOutPayment(transaction: Transaction): boolean {
    return isMultiOutSameTransaction(transaction) || isMultiOutTransaction(transaction);
  }

  public ngOnInit(): void {

    const referencedAccount = this.route.snapshot.data.account;
    if (referencedAccount) {
      this.setAccount(referencedAccount);
      return;
    }

    this.accountService.currentAccount
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((account) => {
        this.setAccount(account);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const referencedAccount = this.route.snapshot.data.account;
    this.setAccount(referencedAccount);
  }

  public setAccount(account: Account): void {
    this.account = account;
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
