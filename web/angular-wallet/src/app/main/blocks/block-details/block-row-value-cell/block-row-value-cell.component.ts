import {Component, Input, ViewChild} from '@angular/core';
import {Block, EncryptedMessage} from '@burstjs/core';
import {convertAddressToNumericId, convertNQTStringToNumber, convertNumericIdToAddress} from '@burstjs/util';
import {decryptMessage, decryptAES, hashSHA256} from '@burstjs/crypto';
import {AccountService} from 'app/setup/account/account.service';
import {BlockCellValue} from '../block-cell-value-mapper';
import {NotifierService} from 'angular-notifier';
import {I18nService} from '../../../../layout/components/i18n/i18n.service';

@Component({
  selector: 'app-block-row-value-cell',
  templateUrl: './block-row-value-cell.component.html',
  styleUrls: ['./block-row-value-cell.component.scss']
})
export class BlockRowValueCellComponent {

  @Input() value: BlockCellValue;
  @Input() block: Block;
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
}

