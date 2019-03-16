import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../setup/account/account.service';
import {convertNQTStringToNumber} from '@burstjs/util';
import {convertBurstTimeToDate} from '@burstjs/util/src';
import {Transaction, Account} from '@burstjs/core';

@Component({
  selector: 'app-balance-diagram',
  templateUrl: './balance-diagram.component.html',
  styleUrls: ['./balance-diagram.component.scss']
})
export class BalanceDiagramComponent implements OnInit {

  private currentAccount: Account;
  public data: any[];
  public view: any[];

  constructor(private accountService: AccountService) {


  }

  private getTransactionValue(transaction: Transaction): number{
    const isNegative = transaction.sender === this.currentAccount.account;
    const amountBurst = convertNQTStringToNumber(transaction.amountNQT);
    return isNegative ? - amountBurst : amountBurst;
  }

  async ngOnInit(): Promise<void>{

    this.currentAccount = await this.accountService.getCurrentAccount();
    const {balanceNQT, account} = this.currentAccount;
    const {transactions} = await this.accountService.getAccountTransactions(account);

    const recentTransactions = transactions.slice(0, 20);

    let balance = convertNQTStringToNumber(balanceNQT);

    const deducedBalances = recentTransactions.map((t: Transaction) => {
      const deduced = {
        name: t.transaction,
        value: balance,
        date: convertBurstTimeToDate(t.timestamp)
      };
      balance = balance - this.getTransactionValue(t) + convertNQTStringToNumber(t.feeNQT);
      return deduced;
    });

    this.view = [700, 400];

    this.data = [
      {
        name: 'Transactions',
        series: deducedBalances.reverse().map(b => ({
          name: b.name,
          value: b.value
        }))
      },
    ];

    // options
    // showXAxis = true;
    // showYAxis = true;
    // gradient = false;
    // showLegend = true;
    // showXAxisLabel = true;
    // xAxisLabel = 'Number';
    // showYAxisLabel = true;
    // yAxisLabel = 'Color Value';
    // timeline = true;
    //
    // colorScheme = {
    //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    // };

  }

  onSelect($event: UIEvent) {
    console.log('selected', $event);
  }
}
