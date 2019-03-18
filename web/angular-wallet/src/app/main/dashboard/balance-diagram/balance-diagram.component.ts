import {Component, Input, OnInit} from '@angular/core';
import {Transaction, Account} from '@burstjs/core';
import {convertBurstTimeToDate, convertNQTStringToNumber} from '@burstjs/util';
import {AccountService} from '../../../setup/account/account.service';
import * as shape from 'd3-shape';
import {getBalanceHistoryFromTransactions} from "../../../util/balance/getBalanceHistoryFromTransactions";
import {BalanceHistoryItem} from "../../../util/balance/typings";


@Component({
  selector: 'app-balance-diagram',
  templateUrl: './balance-diagram.component.html',
  styleUrls: ['./balance-diagram.component.scss']
})
export class BalanceDiagramComponent implements OnInit {

  @Input() public transactionCount?: number;
  public currentAccount: Account;

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
  private balanceHistory: BalanceHistoryItem[];

  constructor(private accountService: AccountService) {
    this.transactionCount = 20;
  }


  async ngOnInit(): Promise<void> {

    this.currentAccount = await this.accountService.getCurrentAccount();
    const {account} = this.currentAccount;
    const {transactions} = await this.accountService.getAccountTransactions(account);
    this.initializeDiagram(transactions.slice(0, this.transactionCount));
  }

  private initializeDiagram(transactions: Transaction[]): void {

    const {account, balanceNQT} = this.currentAccount;

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

  onSelect($event: UIEvent): void {
    // TODO: redirect to transaction details page
    console.log('selected', $event);
  }


}
