import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { EncryptedMessage, Message } from '@burstjs/core';
import { isBurstAddress, convertAddressToNumericId } from '@burstjs/util';
import { decryptMessage, decryptAES, hashSHA256 } from '@burstjs/crypto';
import { AccountService } from 'app/setup/account/account.service';
import { Event } from '@angular/router';

@Component({
  selector: 'app-transaction-row-value-cell',
  templateUrl: './transaction-row-value-cell.component.html',
  styleUrls: ['./transaction-row-value-cell.component.css']
})
export class TransactionRowValueCellComponent implements OnInit {

  @Input('value') value: EncryptedMessage | Message | any;
  @Input('key') key: string;
   // the hex value of the sender public key, for encrypted message decoding
  @Input('senderPublicKeyHex') senderPublicKeyHex: string;
  @ViewChild('pin') pin: string;
  decryptedMessage = '';
  
  valueType = 'string';
  public convertAddressToNumericId;
  public showPin = false;

  constructor(private accountService: AccountService) {
    this.convertAddressToNumericId = convertAddressToNumericId;
  }

  ngOnInit() {
    if (isBurstAddress(this.value as string)) {
      this.valueType = 'BurstAddress';
      //@ts-ignore
    } else if (this.value && this.value.message) {
      console.log('found message', this.value);
      this.valueType = 'Message';
      //@ts-ignore
    } else if (this.value && this.value.encryptedMessage) {
      this.valueType = 'EncryptedMessage';
      console.log('found encryptedMessage', this.value);
    }
  }

  public showPinPrompt() {
    console.log('show pin prompt');
    this.showPin = true;
  }

  public async submitPinPrompt(event) {
    event.stopImmediatePropagation();
    const account = await this.accountService.currentAccount.getValue();
    const privateKey = decryptAES(account.keys.agreementPrivateKey, hashSHA256(this.pin));
    this.decryptedMessage = decryptMessage(<EncryptedMessage>this.value.encryptedMessage, this.senderPublicKeyHex, privateKey);
  }

  public showAccountDialog(address: string) {
    console.log('show account dialog', address);
  }
}
 
