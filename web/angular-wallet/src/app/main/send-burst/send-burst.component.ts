import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { NgForm } from '@angular/forms';
import { burstAddressPattern, convertNQTStringToNumber } from '@burstjs/util';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../transactions/transaction.service';
import { Keys } from '../../../../../../lib/packages/crypto/out/src';

@Component({
  selector: 'app-send-burst',
  templateUrl: './send-burst.component.html',
  styleUrls: ['./send-burst.component.scss']
})
export class SendBurstComponent implements OnInit {
  @ViewChild('sendBurstForm') public sendBurstForm: NgForm;
  @ViewChild('feeNQT') public feeNQT: string;
  @ViewChild('recipientAddress') public recipientAddress: string;
  @ViewChild('amountNQT') public amountNQT: string;
  @ViewChild('message') public message: string;
  @ViewChild('fullHash') public fullHash: string;
  @ViewChild('encrypt') public encrypt: string;
  @ViewChild('pin') public pin: string;
  @ViewChild('deadline') public deadline: string;

  @Output() submit = new EventEmitter<any>();
  advanced: boolean = false;
  showMessage: boolean = false;
  burstAddressPatternRef = burstAddressPattern;

  account: Account;
  fees: SuggestedFees;
  
  constructor(private route: ActivatedRoute,
    private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
  }

  getTotal() {
    return parseFloat(this.amountNQT) + parseFloat(this.feeNQT) || 0;
  }

  setFee(feeNQT: string) {
    this.feeNQT = this.convertFeeToBurst(feeNQT).toString();
  }

  convertFeeToBurst(feeNQT: string) {
    return convertNQTStringToNumber(feeNQT);
  }

  onSubmit(event) {
    this.transactionService.sendBurst({
      transaction: {
        recipientAddress: `BURST-${this.recipientAddress}`,
        amountNQT: parseFloat(this.amountNQT),
        feeNQT: this.feeNQT,
        attachment: this.getMessage(),
        deadline: parseFloat(this.deadline),
        fullHash: this.fullHash,
        type: 1
      },
      pin: this.pin,
      keys: new Keys()
    });
    event.stopImmediatePropagation();
  }

  getMessage() {
    if (this.message) {
      if (this.encrypt) {
        return {
          encryptedMessage: this.message
        }
      } else {
        return {
          message: this.message,
          type: 'message',
          messageIsText: true
        }
      }
    }
    return null;
  }
}
