import {Component, Input, ViewChild} from '@angular/core';
import {EncryptedMessage, Transaction} from '@burstjs/core';
import {convertAddressToNumericId, convertNQTStringToNumber, convertNumericIdToAddress} from '@burstjs/util';
import {decryptMessage, decryptAES, hashSHA256} from '@burstjs/crypto';
import {AccountService} from 'app/setup/account/account.service';
import {CellValue} from '../cell-value-mapper';
import {NotifierService} from 'angular-notifier';
import {I18nService} from '../../../../layout/components/i18n/i18n.service';

@Component({
  selector: 'app-transaction-row-value-cell',
  templateUrl: './transaction-row-value-cell.component.html',
  styleUrls: ['./transaction-row-value-cell.component.scss']
})
export class TransactionRowValueCellComponent {

  @Input() value: CellValue;
  @Input() transaction: Transaction;
  @ViewChild('pin', {static: false}) pin: string;

  decryptedMessage = '';
  public convertAddressToNumericId: (address: string) => string;
  public convertNQTStringToNumber: (amount: string) => number;
  private convertNumericIdToAddress: (numericId: string) => string;

  constructor(
    private accountService: AccountService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
  ) {
    this.convertNumericIdToAddress = convertNumericIdToAddress;
    this.convertAddressToNumericId = convertAddressToNumericId;
    this.convertNQTStringToNumber = convertNQTStringToNumber;
  }


  public async decrypt(event): Promise<void> {
    event.stopImmediatePropagation();
    const account = await this.accountService.currentAccount.getValue();
    let senderPublicKey = this.transaction.senderPublicKey;
    if (account.account === this.transaction.sender) {
      const recipient = await this.accountService.getAccount(this.transaction.recipient);
      // @ts-ignore
      senderPublicKey = recipient.publicKey;
    }
    const privateKey = decryptAES(account.keys.agreementPrivateKey, hashSHA256(this.pin));
    try {
      this.decryptedMessage = decryptMessage(<EncryptedMessage>this.value.data.encryptedMessage, senderPublicKey, privateKey);
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
    }
  }
}

