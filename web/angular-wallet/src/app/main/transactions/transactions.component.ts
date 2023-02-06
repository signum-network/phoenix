import {
  AfterContentInit,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import {
  Transaction,
  TransactionType,
  TransactionArbitrarySubtype,
  isMultiOutSameTransaction,
  isMultiOutTransaction,
  TransactionAssetSubtype,
  TransactionPaymentSubtype,
  TransactionSmartContractSubtype, TransactionEscrowSubtype
} from '@signumjs/core';
import { ChainTime } from '@signumjs/util';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { UnsubscribeOnDestroy } from '../../util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { UtilService } from 'app/util.service';
import { StoreService } from 'app/store/store.service';
import { I18nService } from 'app/shared/services/i18n.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from 'app/shared/services/account-management.service';
import { isSelf } from 'app/util/transaction/isSelf';
import { isBurn } from 'app/util/transaction/isBurn';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { LedgerService } from 'app/ledger.service';


const ColumnsQuery = {
  xl: ['transaction_id', 'timestamp', 'type', 'amount', 'account', 'confirmations'],
  lg: ['transaction_id', 'timestamp', 'type', 'amount', 'account', 'confirmations'],
  md: ['transaction_id', 'timestamp', 'type', 'amount', 'account'],
  sm: ['transaction_id', 'amount', 'account'],
  xs: ['transaction_id', 'amount']
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
  isFetching = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public dataSource = new MatTableDataSource<Transaction>();
  public account: WalletAccount;

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

  oldestTransactionDate: Date;

  isMobile = false;

  constructor(
    private appService: AppService,
    private ledgerService: LedgerService,
    private accountManagementService: AccountManagementService,
    private storeService: StoreService,
    private utilService: UtilService,
    private i18nService: I18nService,
    private observableMedia: MediaObserver,
    private warnDialog: MatDialog,
    private progressBarService: FuseProgressBarService
  ) {
    super();
  }


  public ngOnInit(): void {
    this.account = this.accountManagementService.getSelectedAccount();
    this.dataSource.data = this.account.transactions;
    this.isMobile = this.appService.isRunningOnMobile();

    this.storeService.settingsUpdated$
      .pipe(this.unsubscriber)
      .subscribe(({ language }) => {
          this.language = language;
          this.initTypes();
        }
      );

    this.storeService.accountUpdated$
      .pipe(this.unsubscriber)
      .subscribe((acc: WalletAccount) => {
        this.account = acc;
        this.dataSource.data = acc.transactions;
        this.initTypes();
      });
  }

  private initTypes(): void {
    this.typeMap = {};
    let oldestTransactionTimestamp = Number.MAX_SAFE_INTEGER;
    this.dataSource.data.forEach(t => {
      oldestTransactionTimestamp = Math.min(oldestTransactionTimestamp, t.timestamp);
      const type = this.utilService.translateTransactionSubtype(t, this.account);
      this.typeMap[type] = { t: t.type, s: t.subtype };
    });

    this.typeOptions = Object.keys(this.typeMap);
    this.typeOptions.sort();
    this.typeOptions.unshift('');

    this.recipientTypeMap[''] = '';
    this.recipientTypeMap['self'] = this.i18nService.getTranslation('self');
    this.recipientTypeMap['burn'] = this.i18nService.getTranslation('burn_address');

    this.recipientTypeOptions = Object.entries(this.recipientTypeMap).map(([k, v]) => ({ k, v }));
    this.oldestTransactionDate = ChainTime.fromChainTimestamp(oldestTransactionTimestamp).getDate();
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
    if (type === 'self') {
      return isSelf(transaction);
    }
    if (type === 'burn') {
      return isBurn(transaction);
    }
    return true;
  }

  loadAllTransactions(): void {

    const ref = this.warnDialog.open(FuseConfirmDialogComponent, {
      width: '400px', data: {
        title: this.i18nService.getTranslation('load_all_transactions'),
        message: this.i18nService.getTranslation('load_all_transactions_hint')
      }
    });

    ref.afterClosed()
      .subscribe(async (confirmed) => {
        if (!confirmed) {
          return;
        }
        this.isFetching = true;
        this.progressBarService.show();
        await this.loadTransactions();
        this.progressBarService.hide();
        this.isFetching = false;
      });
  }

  private async loadTransactions(limit = 10_000): Promise<void> {
    const FetchSize = 500;
    let firstIndex = 0;
    let hasMore = true;
    try {
      this.account.transactions = [];
      while (hasMore) {
        const { transactions } = await this.ledgerService.ledger.account.getAccountTransactions({
          accountId: this.account.account,
          resolveDistributions: true,
          includeIndirect: true,
          firstIndex,
          lastIndex: firstIndex + FetchSize
        });

        transactions.sort((a, b) => b.timestamp - a.timestamp );
        this.account.transactions.push(...transactions);
        hasMore = transactions.length >= FetchSize && this.account.transactions.length < limit;
        firstIndex += FetchSize;
        this.storeService.saveAccount(this.account);
      }
    } catch (e) {
      console.error('Loading all transactions caused an error', e.message);
    }
  }
}
