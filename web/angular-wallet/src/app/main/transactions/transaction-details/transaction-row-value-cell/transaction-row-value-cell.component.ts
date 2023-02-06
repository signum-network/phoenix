import {Component, Input, ViewChild} from '@angular/core';
import {Address, Transaction} from '@signumjs/core';
import {decryptMessage, EncryptedMessage} from '@signumjs/crypto';
import {AccountService} from 'app/setup/account/account.service';
import {CellValue} from '../cell-value-mapper';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/shared/services/i18n.service';
import {NetworkService} from 'app/network/network.service';
import { AccountManagementService } from 'app/shared/services/account-management.service';
import { getPrivateEncryptionKey } from 'app/util/security/getPrivateEncryptionKey';

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
  constructor(
    private accountService: AccountService,
    private accountManagementService: AccountManagementService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private networkService: NetworkService
  ) {
  }


  public async decrypt(): Promise<void> {
    event.stopImmediatePropagation();
    const account = this.accountManagementService.getSelectedAccount();
    let senderPublicKey = this.transaction.senderPublicKey;
    if (account.account === this.transaction.sender) {
      const recipient = await this.accountService.getAccount(this.transaction.recipient);
      senderPublicKey = recipient.keys.publicKey;
    }
    const privateKey = getPrivateEncryptionKey(this.pin, account.keys);
    try {
      this.decryptedMessage = decryptMessage(<EncryptedMessage>this.value.data.encryptedMessage, senderPublicKey, privateKey);
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
    }
  }

  public getReedSolomonAddress(numericId: string): string {
    return Address.fromNumericId(numericId, this.networkService.getAddressPrefix()).getReedSolomonAddress();
  }

  convertAddressToNumericId(address: string): string {
    return Address.fromReedSolomonAddress(address).getNumericId();
  }

  decryptOnEnter($event: KeyboardEvent): void {
    if ($event.key === 'Enter'){
      this.decrypt();
    }
  }
}

