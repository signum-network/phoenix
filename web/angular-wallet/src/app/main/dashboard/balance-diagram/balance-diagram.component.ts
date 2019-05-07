import {Router} from '@angular/router';
import {Component, Input, OnChanges} from '@angular/core';
import {Transaction, Account} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';
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

@Component({
  selector: 'app-balance-diagram',
  templateUrl: './balance-diagram.component.html',
  styleUrls: ['./balance-diagram.component.scss']
})
export class BalanceDiagramComponent implements OnChanges{

  @Input() public account: Account;
  @Input() public transactionCount?: number;
  public options = new ChartOptions();
  public data: any[];
  private balanceHistory: BalanceHistoryItem[];

  itemCountOptions = [25, 50, 100, 250, 500].map(i => ({
      value: i, viewValue: i
    })
  );

  constructor(private router: Router) {
    this.transactionCount = 20;
  }

  async ngOnChanges(): Promise<void> {
    this.updateDiagram(this.account.transactions.slice(0, this.transactionCount));
  }

  private updateDiagram(transactions: Transaction[]): void {
    const {account, balanceNQT} = this.account;

    this.balanceHistory = getBalanceHistoryFromTransactions(
      account,
      convertNQTStringToNumber(balanceNQT),
      transactions).reverse();

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
    this.updateDiagram(this.account.transactions.slice(0, this.transactionCount));
  }

  onSelect($event: any): void {
    const transactionId = $event.name;
    this.router.navigateByUrl(`/transactions/transaction/${transactionId}`);
  }

}
