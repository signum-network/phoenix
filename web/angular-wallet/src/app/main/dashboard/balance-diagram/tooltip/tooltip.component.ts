import {Component, Input, OnInit} from '@angular/core';
import {Transaction, Account} from '@burstjs/core';
import {convertBurstTimeToDate, convertNQTStringToNumber} from '@burstjs/util';
import {BalanceHistoryItem} from '../../../../util/balance/typings';
import {UtilService} from '../../../../util.service';

@Component({
  selector: 'app-balance-diagram-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() currentAccount: Account;
  @Input() history: BalanceHistoryItem[];
  @Input() transactionId: string;
  private transaction: Transaction;

  public hasReceived: boolean;
  public fee: number;
  public date: string;
  public amount: number;
  public transactionType: string;
  public senderAddress: string;
  public recipientAddress: string;

  constructor(private utilService: UtilService) {
  }

  async ngOnInit(): Promise<void> {
    const found = this.history.find(i => i.transactionId === this.transactionId);
    if (!found) {
      console.warn(`Transaction ${this.transactionId} not found.`);
      return;
    }

    this.transaction = found.transaction;
    this.hasReceived = this.getHasReceived();
    this.fee = this.getFee();
    this.amount = this.getAmount();
    this.date = this.getDate();
    this.senderAddress = this.getSenderAddress();
    this.recipientAddress = this.getRecipientAddress();
    this.transactionType = this.getTransactionType();
  }

  private getDate = () => convertBurstTimeToDate(this.transaction.timestamp).toLocaleString();
  private getAmount = () => {
    const amountBurst = convertNQTStringToNumber(this.transaction.amountNQT);
    return this.hasReceived ? amountBurst : -amountBurst;
  }
  private getFee = () => convertNQTStringToNumber(this.transaction.feeNQT);
  private getHasReceived = () => this.transaction.recipient === this.currentAccount.account;
  private getTransactionType = () => this.utilService.translateTransactionSubtype(this.transaction, this.currentAccount);
  private getSenderAddress = () => this.transaction.senderRS;
  private getRecipientAddress = () => this.transaction.recipientRS;
}
