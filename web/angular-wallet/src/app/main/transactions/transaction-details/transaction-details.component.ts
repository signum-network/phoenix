import { Component, OnInit } from '@angular/core';
import {
  Transaction
} from '@signumjs/core';
import { StoreService } from 'app/store/store.service';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { UtilService } from '../../../util.service';
import { CellValue, CellValueMapper } from './cell-value-mapper';
import { NetworkService } from '../../../network/network.service';
import { AppService } from '../../../app.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { AccountManagementService } from '../../../shared/services/account-management.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from '../../../util/UnsubscribeOnDestroy';

export interface TransactionDetailRow {
  k: string;
  l: string;
  v: CellValue;
}

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent extends UnsubscribeOnDestroy implements OnInit {

  public detailsData: TransactionDetailRow[] = [];
  account: WalletAccount;
  transaction: Transaction;
  recipient: Account;
  explorerLink: string;

  locale: string;
  private cellValueMapper: CellValueMapper;

  constructor(
    private accountManagementService: AccountManagementService,
    private storeService: StoreService,
    private utilService: UtilService,
    private networkService: NetworkService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {

    this.account = await this.accountManagementService.getSelectedAccount();
    this.storeService.languageSelected$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.updateDetailsData();
      });

    this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.updateDetailsData();
        }
      });
  }


  private updateDetailsData(): void {
    this.transaction = this.route.snapshot.data.transaction as Transaction;
    // @ts-ignore
    delete this.transaction.attachmentBytes;

    this.cellValueMapper = new CellValueMapper(this.transaction, this.account, this.utilService);

    const host = this.networkService.getChainExplorerHost();
    this.explorerLink = `${host}/tx/${this.transaction.transaction}`;

    this.detailsData = Object
      .keys(this.transaction)
      .filter(k => k !== 'distribution')
      .map(k => ({
          k,
          l: this.getFieldNameFromField(k),
          v: this.cellValueMapper.getValue(k)
        })
      ).sort((a, b) => {
        if (a.l < b.l) {
          return -1;
        }
        if (a.l > b.l) {
          return 1;
        }
        return 0;
      });
  }

  trackRows(index, row): any {
    return row ? row.id : undefined;
  }

  getFieldNameFromField(field: string): string {
    return this.utilService.translateTransactionField(field);
  }

  openExplorer(): void {
    if (!this.appService.isDesktop()) {
      window.open(this.explorerLink, 'blank');
    } else {
      this.appService.openInBrowser(this.explorerLink);
    }
  }
}
