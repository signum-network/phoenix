import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import {Transaction} from '@burstjs/core';
import { convertBurstTimeToDate, convertNQTStringToNumber } from "@burstjs/util";
import { UtilService } from "app/util.service";
import { ActivatedRoute } from "@angular/router";
import {Account} from '@burstjs/core'

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html'
})
export class TransactionTableComponent implements OnInit {

  public convertNQTStringToNumber = convertNQTStringToNumber;
  private account: Account;

  @Input() dataSource: MatTableDataSource<Transaction>;
  @Input() public displayedColumns = ['transaction_id', 'attachment', 'timestamp', 'type', 'amount', 'fee', 'account', 'confirmations'];
  @Input() paginationEnabled = true;

  constructor(private utilService: UtilService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.account = this.route.snapshot.data.account;
  }

  public convertTimestamp(timestamp: number): Date {
    return convertBurstTimeToDate(timestamp);
  }

  public getTransactionNameFromType(transaction: Transaction) {
    return this.utilService.getTransactionNameFromType(transaction, this.account);
  }

  public isOwnAccount(address: string): boolean {
    return address != undefined && address == this.account.accountRS;
}

}
