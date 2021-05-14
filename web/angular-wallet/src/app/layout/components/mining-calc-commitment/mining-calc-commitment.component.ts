import {Component, OnInit, Input, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {CustomStepDefinition, LabelType, Options} from '@angular-slider/ngx-slider';
import {I18nService} from '../i18n/i18n.service';
import Color from 'color';
import { formatBurstAmount } from 'app/util/formatBurstAmount';

// @ts-ignore
const SliderAxisBaseColor = Color('#039be5');

@Component({
  selector: 'mining-calc-commitment',
  templateUrl: './mining-calc-commitment.component.html',
  styleUrls: ['./mining-calc-commitment.component.scss']
})
export class MiningCalcCommitmentComponent implements OnInit {
  //@Input() commits: number;
  @Input() networkCommit: number;
  public commitValue = 0;
  networkCommitValue = 0;
  options: Options;

  @Input()  
  get commit(): number {
    return this.commitValue;
  }



  @Output()
    commitChange = new EventEmitter<number>();

 // public comChange(number: any): void {
 //   this.commitChange.emit(number);
 // }

  set commit(commitValue: number) {
    if (!commitValue) {
      this.commitValue = 0;
      return;
    }
    this.commitValue = commitValue;
    this.commitChange.emit(this.commitValue);

  }

  constructor(private i18nService: I18nService) {
  }

  ngOnInit(): void {

   // this.commitValue = 1800;  

    const floor = 0;

    const normalize = (v): number => (v - floor) / (this.networkCommit*101 - floor);

    this.options = {
      
      step: 100,
      floor,
      ceil: this.networkCommit*101,   
      
      showSelectionBar: true,
      
      getSelectionBarColor: (value: number): string => {
        const n = normalize(value);
        const color = SliderAxisBaseColor.fade(1 - n);
        return color.hsl();
      },
      translate: ( value: number, label: LabelType): string => { 
        
        return (value.toString() + " Burst/TB"); }
          
    };


  }


}
