import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../setup/account/account.service';
import {convertNQTStringToNumber} from '@burstjs/util';
import {convertBurstTimeToDate} from '@burstjs/util/src';
import {Transaction, Account} from '@burstjs/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-balance-diagram',
  templateUrl: './balance-diagram.component.html',
  styleUrls: ['./balance-diagram.component.scss']
})
export class BalanceDiagramComponent implements OnInit {

  private currentAccount: Account;

  // TODO: organize better diagram options
  public data: any[];
  public curve = shape.curveBasis;
  public showYAxis = true;
  public yAxisLabel = 'BURST';
  public showYAxisLabel = false;
  public colorScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Linear',
    domain: ['#448aff']
  };

  constructor(private accountService: AccountService) {
  }

  private getTransactionValue(transaction: Transaction): number {
    const isNegative = transaction.sender === this.currentAccount.account;
    const amountBurst = convertNQTStringToNumber(transaction.amountNQT);
    return isNegative ? -amountBurst : amountBurst;
  }

  async ngOnInit(): Promise<void> {

    this.currentAccount = await this.accountService.getCurrentAccount();
    const {account} = this.currentAccount;
    const {transactions} = await this.accountService.getAccountTransactions(account);
    this.initializeDiagram(transactions);
  }

  // @TODO unit tests - extract as helper
  private deduceBalances(transactions: Transaction[]): any[] {
    const {balanceNQT} = this.currentAccount;
    const recentTransactions = transactions.slice(0, 20);

    let balance = convertNQTStringToNumber(balanceNQT);

    return recentTransactions.map((t: Transaction) => {
      const deduced = {
        name: t.transaction,
        value: balance,
        date: convertBurstTimeToDate(t.timestamp)
      };
      balance = balance - this.getTransactionValue(t) + convertNQTStringToNumber(t.feeNQT);
      return deduced;
    });
  }

  private initializeDiagram(transactions: Transaction[]): void {

    const balanceHistory = this.deduceBalances(transactions).reverse();

    this.data = [
      {
        name: 'Balance',
        series: balanceHistory.map(b => ({
          name: b.name,
          value: b.value
        }))
      },
    ];
  }

  onSelect($event: UIEvent): void {
    // TODO: redirect to transaction details page
    console.log('selected', $event);
  }
}
