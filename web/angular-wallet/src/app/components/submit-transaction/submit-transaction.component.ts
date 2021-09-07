import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-submit-transaction',
  templateUrl: './submit-transaction.component.html',
  styleUrls: ['./submit-transaction.component.scss']
})
export class SubmitTransactionComponent {

  @Input() isSubmitting = false;
  @Input() disabled = false;
  @Input() pin = '';

  @Output() pinChange = new EventEmitter<string>();

  onChange(pin: string): void {
    this.pin = pin;
    this.pinChange.next(pin);
  }
}
