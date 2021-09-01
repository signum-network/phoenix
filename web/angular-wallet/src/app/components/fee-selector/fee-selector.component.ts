import {Component, OnInit, Input, Output} from '@angular/core';
import {convertNQTStringToNumber} from '@signumjs/util';
import {SuggestedFees} from '@signumjs/core';
import {EventEmitter} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {AmountPipe} from '../../shared/pipes/amount.pipe';
import {formatAmount} from '../../util/formatAmount';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import Color from 'color';

// @ts-ignore
const SliderAxisBaseColor = Color('#039be5');

@Component({
  selector: 'app-fee-selector',
  templateUrl: './fee-selector.component.html',
  styleUrls: ['./fee-selector.component.scss']
})
export class FeeSelectorComponent implements OnInit {
  @Input() fees: SuggestedFees;

  feeValue = 0;
  burstAmountPipe: AmountPipe;
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
        return formatAmount(value, {
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
