import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {
  Transaction,
  Account,
  TransactionType,
  TransactionArbitrarySubtype,
  isMultiOutSameTransaction, isMultiOutTransaction, TransactionAssetSubtype, TransactionPaymentSubtype
} from '@signumjs/core';
import {ChainTime} from '@signumjs/util';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {UtilService} from '../../util.service';
import {StoreService} from '../../store/store.service';
import {AccountService} from '../../setup/account/account.service';
import { I18nService } from '../../layout/components/i18n/i18n.service';


const ColumnsQuery = {
  xl: ['transaction_id', 'timestamp', 'type', 'amount', 'account', 'confirmations'],
  lg: ['transaction_id', 'timestamp', 'type', 'amount', 'account', 'confirmations'],
  md: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
  sm: ['transaction_id', 'timestamp', 'amount', 'account'],
  xs: ['transaction_id', 'timestamp', 'amount'],
};

interface Types {
  type: number;
  subtype: number;
  text: string;
}

@Component({
  selector: 'app-transactions',
  styleUrls: ['./transactions.component.scss'],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent extends UnsubscribeOnDestroy implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public dataSource: MatTableDataSource<Transaction>;
  public account: Account;

  pickerFromField = new FormControl();
  pickerToField = new FormControl();
  typesField = new FormControl();
  recipientTypesField = new FormControl();
  searchField = new FormControl();

  typeOptions: string[] = [];
  recipientTypeOptions: { k: string, v: string }[] = [];
  columns: string[] = ColumnsQuery.xl;
  today = new Date();
  minDate: Date;
  typeMap: object = {};
  recipientTypeMap: object = {};
  language: any;
  unsubscriber = takeUntil(this.unsubscribeAll);

  constructor(
    private accountService: AccountService,
    private storeService: StoreService,
    private utilService: UtilService,
    private i18nService: I18nService,
    private observableMedia: MediaObserver
  ) {
    super();
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Transaction>();
    this.storeService.settings
      .pipe(this.unsubscriber)
      .subscribe(({language}) => {
          this.language = language;
          this.initTypes();
        }
      );

    this.accountService.currentAccount$
      .pipe(this.unsubscriber)
      .subscribe((acc: Account) => {
        this.account = acc;
        this.dataSource.data = acc.transactions;
        this.initTypes();
      });
  }

  private initTypes(): void {
    this.dataSource.data.forEach(t => {
      const type = this.utilService.translateTransactionSubtype(t, this.account);
      this.typeMap[type] = {t: t.type, s: t.subtype};
    });

    this.typeOptions = Object.keys(this.typeMap);
    this.typeOptions.sort();
    this.typeOptions.unshift('');

    this.recipientTypeMap[''] = '';
    this.recipientTypeMap['self'] = this.i18nService.getTranslation('self');
    this.recipientTypeMap['burn'] = this.i18nService.getTranslation('burn_address') ;

    this.recipientTypeOptions = Object.entries(this.recipientTypeMap).map(([k, v]) => ({k, v}));
  }

  public ngAfterContentInit(): void {
    this.observableMedia.asObservable()
      .pipe(this.unsubscriber)
      .subscribe((change: MediaChange[]) => {
        this.columns = ColumnsQuery[change[0].mqAlias];
      });
  }

  public ngAfterViewInit(): void {
    const defaultFilterPredicate = this.dataSource.filterPredicate;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (transaction, filterValue: string) =>
      this.isInDateRange(transaction)
      && this.isOfType(transaction)
      && this.isOfRecipientType(transaction)
      && defaultFilterPredicate(transaction, filterValue);
  }

  private isTokenHolderDistribution(transaction: Transaction): boolean {
    return transaction.type === TransactionType.Asset && transaction.subtype === TransactionAssetSubtype.AssetDistributeToHolders;
  }

  private isMultiOutPayment(transaction: Transaction): boolean {
    return isMultiOutSameTransaction(transaction) || isMultiOutTransaction(transaction) || this.isTokenHolderDistribution(transaction);
  }

  private isSelf(transaction: Transaction): boolean
  {
    if ( this.isMultiOutPayment(transaction)) {
      return false;
    }

    if (transaction.sender === transaction.recipient) {
      return true;
    }
    if (transaction.type === TransactionType.Arbitrary) {
      return transaction.subtype === TransactionArbitrarySubtype.AccountInfo ||
        transaction.subtype === TransactionArbitrarySubtype.AliasAssignment;
    }
    return transaction.type === TransactionType.Mining;
  }

  private isBurn(transaction: Transaction): boolean {
    return !transaction.recipient && (
      (transaction.type === TransactionType.Asset && transaction.subtype === TransactionAssetSubtype.AssetTransfer) ||
      (transaction.type === TransactionType.Payment && transaction.subtype === TransactionPaymentSubtype.Ordinary)
    );
  }

  private isOfType(transaction: Transaction): boolean {
    const type = this.typeMap[this.typesField.value];
    return type ? type.t === transaction.type && type.s === transaction.subtype : true;
  }

  private isInDateRange(transaction: Transaction): boolean {
    const date = this.convertTimestamp(transaction.timestamp);
    if (this.pickerFromField.value && this.pickerToField.value) {
      return date > this.pickerFromField.value && date < this.pickerToField.value;
    }
    if (this.pickerFromField.value) {
      return date > this.pickerFromField.value;
    }
    if (this.pickerToField.value) {
      return date < this.pickerToField.value;
    }
    return true;
  }

  // '1' is always part of the serialized data string
  public applyFilter(filterValue: string = '1'): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public convertTimestamp(timestamp: number): Date {
    return ChainTime.fromChainTimestamp(timestamp).getDate();
  }

  public resetFilter(): void {
    this.typesField.reset();
    this.recipientTypesField.reset();
    this.pickerToField.reset();
    this.pickerFromField.reset();
    this.searchField.reset();
    this.applyFilter();
  }

  private isOfRecipientType(transaction: Transaction): boolean {
    const type = this.recipientTypesField.value;
    if (type === 'self'){
      return this.isSelf(transaction);
    }
    if (type === 'burn'){
      return this.isBurn(transaction);
    }
    return true;
  }
}
