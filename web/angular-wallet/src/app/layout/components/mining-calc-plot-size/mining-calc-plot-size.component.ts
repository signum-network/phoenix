import {Component, OnInit, Input, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {I18nService} from '../i18n/i18n.service';
import Color from 'color';

// @ts-ignore
const SliderAxisBaseColor = Color('#039be5');

@Component({
  selector: 'mining-calc-plot-size',
  templateUrl: './mining-calc-plot-size.component.html',
  styleUrls: ['./mining-calc-plot-size.component.scss']
})
export class MiningCalcPlotSizeComponent implements OnInit {
  @Input() plots: number;

  public plotValue = 0;
  options: Options;

 @Input()
  get plot(): number {
    return this.plotValue;
  }

  @Output()
  plotChange = new EventEmitter<number>();

  public plChange(number: any): void {
   this.plotChange.emit(number);

 }

  set plot(plotValue: number) {
    if (!plotValue) {
      this.plotValue = 0;
      return;
    }
    this.plotValue = plotValue;
    this.plotChange.emit(this.plotValue);

  }


  constructor(private i18nService: I18nService) {
    
  }

  ngOnInit(): void {
    
    const floor = 0;
    const ceil = 500;

    const normalize = (v): number => (v - floor) / (ceil - floor);

    this.options = {
      step: .1,
      floor,
      ceil,
      showSelectionBar: true,
      getSelectionBarColor: (value: number): string => {
        const n = normalize(value);
        const color = SliderAxisBaseColor.fade(1 - n);
        return color.hsl();
      },
      translate: ( value: number, label: LabelType): string => { 
        
        return (value.toString() + " TB"); }
    };
  }


}
