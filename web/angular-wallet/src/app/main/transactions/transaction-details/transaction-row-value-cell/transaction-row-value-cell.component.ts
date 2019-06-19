import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EncryptedMessage, Message } from '@burstjs/core';
import { isBurstAddress, convertAddressToNumericId } from '@burstjs/util';
import { decryptMessage, decryptAES, hashSHA256 } from '@burstjs/crypto';
import { AccountService } from 'app/setup/account/account.service';
import {CellValue} from '../cell-value-mapper';

@Component({
  selector: 'app-transaction-row-value-cell',
  templateUrl: './transaction-row-value-cell.component.html',
  styleUrls: ['./transaction-row-value-cell.component.css']
})
export class TransactionRowValueCellComponent implements OnInit {

  @Input('value') value: CellValue;
  @Input('key') key: string;
   // the hex value of the sender public key, for encrypted message decoding
  @Input('senderPublicKeyHex') senderPublicKeyHex: string;
  @ViewChild('pin', { static: false }) pin: string;
  decryptedMessage = '';

  valueType = 'string';
  public convertAddressToNumericId;

  constructor(private accountService: AccountService) {
    this.convertAddressToNumericId = convertAddressToNumericId;
  }

  ngOnInit(): void {

    const {data} = this.value;

    // if (isBurstAddress(value as string)) {
    //   this.valueType = 'BurstAddress';
    // }
    // else if (v && value.message) {
    //   this.valueType = 'Message';
    // }
    // else if (v && value.encryptedMessage) {
    //   this.valueType = 'EncryptedMessage';
    // }
    // else if (this.key === 'transactions') {
    //   this.valueType = 'Transactions';
    // }
    // // else if (value && typeof value === 'object') {
    // //   this.valueType = 'Asset';
    // // }
  }

  public async submitPinPrompt(event): Promise<void> {
    event.stopImmediatePropagation();
    const account = await this.accountService.currentAccount.getValue();
    const privateKey = decryptAES(account.keys.agreementPrivateKey, hashSHA256(this.pin));
    this.decryptedMessage = decryptMessage(<EncryptedMessage>this.value.data.encryptedMessage, this.senderPublicKeyHex, privateKey);
  }
}

