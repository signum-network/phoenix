import {Component, OnInit, Input, Output} from '@angular/core';
import {convertNQTStringToNumber} from '@burstjs/util';
import {SuggestedFees} from '@burstjs/core';
import {EventEmitter} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {BurstAmountPipe} from '../../../shared/pipes/burst-amount.pipe';
import {formatBurstAmount} from '../../../util/formatBurstAmount';
import {I18nService} from '../i18n/i18n.service';
// @ts-ignore
import Color from 'color';

const SliderAxisBaseColor = Color('#039be5');

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

    const floor = this.convertFeeToBurst(this.fees.minimum);
    const ceil = this.convertFeeToBurst(this.fees.priority);

    const normalize = (v): number => (v - floor) / (ceil - floor);

    this.options = {
      step: 0.0000001,
      floor,
      ceil,
      showSelectionBar: true,
      getSelectionBarColor: (value: number): string => {
        const n = normalize(value);
        const color = SliderAxisBaseColor.fade(1 - n);
        return color.hsl();
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
