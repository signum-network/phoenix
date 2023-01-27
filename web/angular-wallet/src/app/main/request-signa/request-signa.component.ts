import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SuggestedFees, TransactionPaymentSubtype, TransactionType } from '@signumjs/core';
import { NgForm } from '@angular/forms';
import { Amount, CurrencySymbol } from '@signumjs/util';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { MatStepper } from '@angular/material/stepper';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-request-signa',
  templateUrl: './request-signa.component.html',
  styleUrls: ['./request-signa.component.scss']
})
export class RequestSignaComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(MatStepper, { static: true }) stepper: MatStepper;

  @Output() submit = new EventEmitter<any>();

  fee: string;
  amount: string;
  immutable = false;
  advanced = false;
  showMessage = false;
  account: WalletAccount;
  fees: SuggestedFees;
  senderRS: string;
  paymentTimer;
  symbol = CurrencySymbol;
  txType = TransactionType.Payment;
  txSubtype = TransactionPaymentSubtype.Ordinary;
  paid = false;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService) {
    super();
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as WalletAccount;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
  }

  getAmount(): number {
    return parseFloat(this.amount) || 0;
  }

  getTotal(): number {
    return this.getAmount() + parseFloat(this.fee) || 0;
  }


  checkForPayment(): void {
    this.clearPaymentTimer();
    this.paymentTimer = setTimeout(async () => {
      try {
        const { unconfirmedTransactions } = await this.accountService.getUnconfirmedTransactions(this.account.account);
        const foundTransaction = unconfirmedTransactions.find((transaction) =>
          Amount.fromPlanck(transaction.amountNQT).equals(Amount.fromSigna(this.amount))
        );
        if (!foundTransaction) {
          this.paid = true;
          this.senderRS = foundTransaction.senderRS;
        } else {
          this.checkForPayment();
        }
      } catch (e) {
        this.checkForPayment();
        console.warn(e);
      }
    }, 5000);
  }

  clearPaymentTimer(): void {
    if (this.paymentTimer) {
      clearInterval(this.paymentTimer);
    }
  }

  ngOnDestroy(): void {
    this.clearPaymentTimer();
    super.ngOnDestroy();
  }

}
