import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from '@signumjs/core';
import { AccountBalances, getBalancesFromAccount } from 'app/util/balance';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnChanges {

  @Input() account: Account;

  balance: AccountBalances;
  datasets = [];
  labels = [];
  options: any = {
    animation: false,
    tooltips: {
      enabled: false
    },
    responsive: true
  };

  constructor() {
  }

  ngOnInit(): void {
    this.update();
  }

  ngOnChanges(): void {
    this.update();
  }

  private update(): void {
    this.balance = getBalancesFromAccount(this.account);
    this.datasets = [
      {
        label: 'set1',
        backgroundColor: [
          '#00FF88',
          '#0099ff'
        ],
        data: [
          parseFloat(this.balance.availableBalance.getSigna()),
          parseFloat(this.balance.lockedBalance.getSigna())]
      }
    ];
  }

}
