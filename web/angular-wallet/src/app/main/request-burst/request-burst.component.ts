import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Account, SuggestedFees, TransactionPaymentSubtype, TransactionType } from '@signumjs/core';
import {NgForm} from '@angular/forms';
import { Amount, convertNumberToNQTString, CurrencySymbol } from '@signumjs/util';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import {MatStepper} from '@angular/material/stepper';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-request-burst',
    templateUrl: './request-burst.component.html',
    styleUrls: ['./request-burst.component.scss']
})
export class RequestBurstComponent extends UnsubscribeOnDestroy implements OnInit {
    @ViewChild(MatStepper, {static: true}) stepper: MatStepper;
    @ViewChild('requestBurstForm', {static: true}) public requestBurstForm: NgForm;
    @ViewChild('amount', {static: false}) public amount: string;
    @ViewChild('fee', {static: false}) public fee: string;
    @ViewChild('immutable', {static: false}) public immutable = false;
    @Output() submit = new EventEmitter<any>();

    advanced = false;
    showMessage = false;
    account: Account;
    fees: SuggestedFees;
    senderRS: string;
    poller;
    symbol = CurrencySymbol;
    txType = TransactionType.Payment;
    txSubtype = TransactionPaymentSubtype.Ordinary;
    paid = false;

    constructor(private route: ActivatedRoute,
                private accountService: AccountService,
                private storeService: StoreService) {
        super();
    }

    ngOnInit(): void {
        this.account = this.route.snapshot.data.account as Account;
        this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
        this.amount = '0';
        this.storeService
            .ready
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((ready) => {
                if (ready) {
                    this.accountService.currentAccount$
                        .pipe(takeUntil(this.unsubscribeAll))
                        .subscribe((account) => {
                            this.account = account;
                        });
                }
            });

    }

    getAmount(): number {
        return parseFloat(this.amount) || 0;
    }

    getTotal(): number {
        return this.getAmount() + parseFloat(this.fee) || 0;
    }

    async onSubmit(event): Promise<void> {
        event.stopImmediatePropagation();
        this.stepper.selectedIndex = 1;
        // "Instant Payment" via unconfirmed transactions
        this.startPollingForPayment();
    }

    async startPollingForPayment(): Promise<void> {
        this.clearPollInterval();
        this.poller = setInterval(async () => {
            try {
                const transactions = await this.accountService.getUnconfirmedTransactions(this.account.account);
                transactions.unconfirmedTransactions.map((transaction) => {
                    if (Amount.fromPlanck(transaction.amountNQT).equals(Amount.fromSigna(this.amount)))
                    {
                        this.paid = true;
                        this.senderRS = transaction.senderRS;
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }, 5000); // 5 secs
    }

    clearPollInterval(): void {
        if (this.poller) {
            clearInterval(this.poller);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.clearPollInterval();
    }

}
