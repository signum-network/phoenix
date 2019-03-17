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

  feeNQTValue = '';
  options: Options;

  @Input()
  get feeNQT() {
    return this.feeNQTValue;
  }

  @Output()
  feeNQTChange = new EventEmitter();
  set feeNQT(feeNQT: string) {
    this.feeNQTValue = feeNQT;
    this.feeNQTChange.emit(this.feeNQTValue);
  }

  constructor() {
  }

  ngOnInit() {
    // avoids ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.feeNQT = this.convertFeeToBurst(this.fees.standard).toString();
    });
    this.options = {
      step:0.0000001,
      floor: this.convertFeeToBurst(this.fees.cheap),
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

  convertFeeToBurst(feeNQT: number) {
    return convertNQTStringToNumber(feeNQT.toString());
  }

}
