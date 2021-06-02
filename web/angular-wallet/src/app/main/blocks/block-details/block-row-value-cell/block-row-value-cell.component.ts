import {Component, Input, ViewChild} from '@angular/core';
import {Block, Address} from '@signumjs/core';
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
  constructor(
    private accountService: AccountService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
  ) {
  }

  getNumericId(data: any): string {
    return Address.fromReedSolomonAddress(data).getNumericId()
  }
}

