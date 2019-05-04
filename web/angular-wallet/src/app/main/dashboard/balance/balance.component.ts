import {Component, Input, OnInit} from '@angular/core';
import {Account} from '@burstjs/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent extends UnsubscribeOnDestroy {

  constructor(private storeService: StoreService) {
    super();
    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({language}) => {
        this.language = language;
      }
    );
  }

  @Input() public account: Account;
  @Input() public priceBtc: number;
  @Input() public priceUsd: number;
  public language: string;

  public convertNQTStringToNumber = convertNQTStringToNumber;

  convertBalanceInBtc = (balanceNQT: string) => this.convertNQTStringToNumber(balanceNQT) * this.priceBtc;
  convertBalanceInUsDollar = (balanceNQT: string) => this.convertNQTStringToNumber(balanceNQT) * this.priceUsd;
}
