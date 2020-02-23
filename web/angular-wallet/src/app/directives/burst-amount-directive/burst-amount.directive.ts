import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {formatNumber} from '@angular/common';

@Directive({
  selector: '[burstAmount]',
})
export class BurstAmountDirective implements OnInit, OnChanges {

  private languageCode: string;
  @Input() burst: number;
  @Input() withSuffix = true;

  constructor(private el: ElementRef, private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.update();
    this.i18nService.subscribe(this.update.bind(this), null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  private update(): void {
    this.languageCode = this.i18nService.currentLanguage.code;
    this.formatAmount();
  }

  private formatAmount(): void {
    let text = formatNumber(this.burst, this.languageCode, '1.0-6');
    if (this.withSuffix) {
      text += ' BURST';
    }
    this.el.nativeElement.innerText = text;
  }

}
