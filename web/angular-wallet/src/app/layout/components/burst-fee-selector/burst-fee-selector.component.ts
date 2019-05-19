import { Component, OnInit, Input, Output } from '@angular/core';
import { convertNQTStringToNumber } from '@burstjs/util';
import { SuggestedFees } from '@burstjs/core';
import { EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'burst-fee-selector',
  templateUrl: './burst-fee-selector.component.html',
  styleUrls: ['./burst-fee-selector.component.scss']
})
export class BurstFeeSelectorComponent implements OnInit {
  @Input('fees') fees: SuggestedFees;

  feeNQTValue = 0;
  options: Options;

  @Input()
  get feeNQT(): number {
    return this.feeNQTValue;
  }

  @Output()
  feeNQTChange = new EventEmitter();

  set feeNQT(feeNQT: number) {
    if (!feeNQT) {
      this.feeNQTValue = 0;
      return;
    }
    this.feeNQTValue = parseFloat(feeNQT.toString());
    this.feeNQTChange.emit(this.feeNQTValue);
  }

  constructor() {
  }

  ngOnInit(): void {
    // avoids ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.feeNQT = this.convertFeeToBurst(this.fees.standard);
    });
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
      }
    };
  }

  convertFeeToBurst(feeNQT: number): number {
    return convertNQTStringToNumber(feeNQT.toString());
  }

}
