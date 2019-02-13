import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[burstInputValidator]',
})
export class BurstInputValidatorDirective {

  constructor(private el: ElementRef, private control : NgControl) {

  }

  // trim BURST- from pasted entries
  @HostListener('paste',['$event']) onEvent($event) {
    $event.preventDefault();
    let data = $event.clipboardData.getData('text');

    setTimeout(() => {
      if (data.indexOf('BURST-') > -1) {
        this.control.control.setValue(data.split('BURST-')[1].replace(/(\r\n\t|\n|\r\t)/gm,""));
      } else {
        this.control.control.setValue(data.replace(/(\r\n\t|\n|\r\t)/gm,""));
      }
    }, 100);
  }

}
