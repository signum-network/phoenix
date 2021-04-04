import {Component, OnInit, Input, Output} from '@angular/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import {SuggestedFees} from '@burstjs/core';
import {EventEmitter} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {BurstAmountPipe} from '../../../shared/pipes/burst-amount.pipe';
import {formatBurstAmount} from '../../../util/formatBurstAmount';
import {I18nService} from '../i18n/i18n.service';

@Component({
  selector: 'burst-fee-selector',
  templateUrl: './burst-fee-selector.component.html',
  styleUrls: ['./burst-fee-selector.component.scss']
})
export class BurstFeeSelectorComponent implements OnInit {
  @Input() fees: SuggestedFees;

  feeValue = 0;
  burstAmountPipe: BurstAmountPipe;
  options: Options;

  @Input()
  get fee(): number {
    return this.feeValue;
  }

  @Output()
  feeChange = new EventEmitter();

  set fee(feeValue: number) { // not Planck
    if (!feeValue) {
      this.feeValue = 0;
      return;
    }
    this.feeValue = feeValue;
    this.feeChange.emit(this.feeValue);
  }

  constructor(private i18nService: I18nService) {
  }

  ngOnInit(): void {

    this.options = {
      step: 0.0000001,
      floor: this.convertFeeToBurst(this.fees.minimum),
      ceil: this.convertFeeToBurst(this.fees.priority),
      showSelectionBar: true,
      getSelectionBarColor: (value: number): string => {
        if (value < this.convertFeeToBurst(this.fees.standard)) {
          return 'orange';
        }
        if (value < this.convertFeeToBurst(this.fees.priority)) {
          return 'yellow';
        }
        return '#2AE02A';
      },
      translate: (value: number, label: LabelType): string => {
        return formatBurstAmount(value, {
          locale: this.i18nService.currentLanguage.code,
          noUnit: false,
          isShortForm: false
        });
      }
    };
  }

  convertFeeToBurst(feeNQT: number): number {
    return convertNQTStringToNumber(feeNQT.toString());
  }

}
