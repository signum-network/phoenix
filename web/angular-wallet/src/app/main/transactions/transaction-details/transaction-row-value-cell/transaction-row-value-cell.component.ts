import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {EncryptedMessage} from '@burstjs/core';
import {convertAddressToNumericId} from '@burstjs/util';
import {decryptMessage, decryptAES, hashSHA256} from '@burstjs/crypto';
import {AccountService} from 'app/setup/account/account.service';
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
  @ViewChild('pin', {static: false}) pin: string;
  decryptedMessage = '';

  valueType = 'string';
  public convertAddressToNumericId;

  constructor(private accountService: AccountService) {
    this.convertAddressToNumericId = convertAddressToNumericId;
  }

  ngOnInit(): void {
    this.valueType = this.value.type;
  }

  public async submitPinPrompt(event): Promise<void> {
    event.stopImmediatePropagation();
    const account = await this.accountService.currentAccount.getValue();
    const privateKey = decryptAES(account.keys.agreementPrivateKey, hashSHA256(this.pin));
    this.decryptedMessage = decryptMessage(<EncryptedMessage>this.value.data.encryptedMessage, this.senderPublicKeyHex, privateKey);
  }
}

