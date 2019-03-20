import {Router} from '@angular/router';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Transaction, Account} from '@burstjs/core';
import {convertBurstTimeToDate, convertNQTStringToNumber} from '@burstjs/util';
import {AccountService} from '../../../setup/account/account.service';
import * as shape from 'd3-shape';
import {getBalanceHistoryFromTransactions} from '../../../util/balance/getBalanceHistoryFromTransactions';
import {BalanceHistoryItem} from '../../../util/balance/typings';

class ChartOptions {
  public curve = shape.curveCatmullRom.alpha('1.0');
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
export class BalanceDiagramComponent implements OnChanges {

  @Input() public account: Account;
  @Input() public transactionCountLimit?: number;
  public options = new ChartOptions();
  public data: any[];

  private balanceHistory: BalanceHistoryItem[];

  constructor(private router: Router) {
    this.transactionCountLimit = 20;
  }

  async ngOnChanges(): Promise<void> {
    this.updateDiagram(this.account.transactions.slice(0, this.transactionCountLimit));
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

  onSelect($event: any): void {
    const transactionId = $event.name;
    this.router.navigateByUrl(`/transactions/transaction/${transactionId}`);
  }


}
