import {Router} from '@angular/router';
import {Component, Input, OnChanges} from '@angular/core';
import {Account} from '@burstjs/core';
import {convertBurstTimeToDate, convertNQTStringToNumber} from '@burstjs/util';
import * as shape from 'd3-shape';
import {getBalanceHistoryFromTransactions} from '../../../util/balance/getBalanceHistoryFromTransactions';
import {BalanceHistoryItem} from '../../../util/balance/typings';

class ChartOptions {
  public curve = shape.curveBasis;
  public gradient = true;
  public showYAxis = true;
  public yAxisLabel = 'BURST';
  public showYAxisLabel = false;
  public colorScheme = {
    domain: ['#448aff', '#A6C6FF']
  };
}

const TransactionCountOptions = [25, 50, 100, 250, 500];

@Component({
  selector: 'app-balance-diagram',
  templateUrl: './balance-diagram.component.html',
  styleUrls: ['./balance-diagram.component.scss']
})
export class BalanceDiagramComponent implements OnChanges {

  @Input() public account: Account;
  @Input() public transactionCount?: number;
  public options = new ChartOptions();
  public data: any[];
  private balanceHistory: BalanceHistoryItem[];
  itemCountOptions: Array<any>;
  firstDate: Date;

  constructor(private router: Router) {
    this.transactionCount = 0;
  }

  async ngOnChanges(): Promise<void> {
    this.itemCountOptions = this.getMaximumItemCountOptions();
    this.updateDiagram();
  }

  private getMaximumItemCountOptions(): Array<number> {

    const transactionCountMax = this.account.transactions.length;
    const availableOptions = [];
    for (let i = 0; i < TransactionCountOptions.length; ++i) {
      const transactionCount = TransactionCountOptions[i];
      const option = {value: transactionCount, viewValue: transactionCount};
      availableOptions.push(option);
      if (transactionCount > transactionCountMax) {
        break;
      }
    }
    return availableOptions;
  }

  private updateDiagram(): void {
    const transactions = this.account.transactions.slice(0, this.transactionCount);
    const {account, balanceNQT} = this.account;

    this.balanceHistory = getBalanceHistoryFromTransactions(
      account,
      convertNQTStringToNumber(balanceNQT),
      transactions).reverse();

    this.firstDate = this.balanceHistory.length && convertBurstTimeToDate(this.balanceHistory[0].timestamp);

    this.data = [
      {
        name: 'Balance',
        series: this.balanceHistory.map(b => ({
          name: b.transactionId,
          value: b.balance,
        }))
      },
    ];
  }

  onItemCountSelected(): void {
    this.updateDiagram();
  }

  onSelect($event: any): void {
    const transactionId = $event.name;
    this.router.navigateByUrl(`/transactions/transaction/${transactionId}`);
  }

}
