import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Address} from '@burstjs/core';

@Directive({
  selector: '[pasteableAddress]',
})
export class PasteableAddressDirective {

  constructor(private el: ElementRef, private control: NgControl) {

  }

  // trim address prefix from pasted entries
  @HostListener('paste', ['$event'])
  onEvent($event): void {
    $event.preventDefault();
    const data = $event.clipboardData.getData('text');
    try {
      const address = Address.fromReedSolomonAddress(data); // validates the address also
      this.control.control.setValue(address.getReedSolomonAddress(false));
    } catch (e) {
      // ignore invalid address format
    }
  }

}
