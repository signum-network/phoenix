import {Component, Input, OnInit} from '@angular/core';
import {Account} from '@signumjs/core';
import {AccountBalances, getBalancesFromAccount} from 'app/util/balance';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input() account: Account;

  balance: AccountBalances;

  constructor() {
  }

  ngOnInit(): void {
    this.balance = getBalancesFromAccount(this.account);
  }

}
