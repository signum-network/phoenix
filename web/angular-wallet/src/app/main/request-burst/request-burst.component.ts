import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { NgForm } from '@angular/forms';
import { convertNumberToNQTString } from '@burstjs/util';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { MatStepper } from '@angular/material';
import { environment } from 'environments/environment';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-request-burst',
  templateUrl: './request-burst.component.html',
  styleUrls: ['./request-burst.component.scss']
})
export class RequestBurstComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(MatStepper) stepper: MatStepper;
  @ViewChild('requestBurstForm') public requestBurstForm: NgForm;
  @ViewChild('amountNQT') public amountNQT = '0';
  @ViewChild('feeNQT') public feeNQT: string;
  @ViewChild('immutable') public immutable = false;
  @Output() submit = new EventEmitter<any>();

  advanced = false;
  showMessage = false;
  account: Account;
  fees: SuggestedFees;
  imgSrc: string;
  senderRS: string;
  poller;

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private storeService: StoreService) {
    super();
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;

    this.storeService
      .ready
      .pipe( takeUntil(this.unsubscribeAll) )
      .subscribe((ready) => {
      if (ready) {
        this.accountService.currentAccount.subscribe((account) => {
          this.account = account;
        });
      }
    });

  }

  getAmount(): number {
    return parseFloat(this.amountNQT) || 0;
  }

  getTotal(): number {
    return this.getAmount() + parseFloat(this.feeNQT) || 0;
  }

  async onSubmit(event): Promise<void> {
    this.imgSrc = await this.accountService.generateSendTransactionQRCodeAddress(
      this.account.account,
      parseFloat(convertNumberToNQTString(parseFloat(this.amountNQT))) || 0,
      undefined,
      parseFloat(convertNumberToNQTString(parseFloat(this.feeNQT))),
      this.immutable
    );

    this.imgSrc = `${environment.defaultNode}/${this.imgSrc}`;
    event.stopImmediatePropagation();
    this.stepper.selectedIndex = 1;
    // "Instant Payment" via unconfirmed transactions
    // this.startPollingForPayment();
  }

  startPollingForPayment() {
    this.clearPollInterval();
    this.poller = setInterval(async () => {
      try {
        const transactions = await this.accountService.getUnconfirmedTransactions(this.account.account);
        transactions.unconfirmedTransactions.map((transaction) => {
          if (parseFloat(transaction.amountNQT) === parseFloat(convertNumberToNQTString(parseFloat(this.amountNQT)))) {
            this.stepper.selectedIndex = 2;
            this.senderRS = transaction.senderRS;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }, 5000); // 5 secs
  }

  clearPollInterval(): void {
    if (this.poller){
      clearInterval(this.poller);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.clearPollInterval();
  }

}
