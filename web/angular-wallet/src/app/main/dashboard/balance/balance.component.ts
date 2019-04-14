import {Component, Input, OnInit} from '@angular/core';
import {Account} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent{

  @Input() public account: Account;
  @Input() public priceBtc: number;
  @Input() public priceUsd: number;

  public convertNQTStringToNumber = convertNQTStringToNumber;

  convertBalanceInBtc = (balanceNQT: string) => this.convertNQTStringToNumber(balanceNQT) * this.priceBtc;
  convertBalanceInUsDollar = (balanceNQT: string) => this.convertNQTStringToNumber(balanceNQT) * this.priceUsd;

}
