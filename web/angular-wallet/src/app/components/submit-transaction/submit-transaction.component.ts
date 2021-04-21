import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';

@Component({
  selector: 'app-submit-transaction',
  templateUrl: './submit-transaction.component.html',
  styleUrls: ['./submit-transaction.component.scss']
})
export class SubmitTransactionComponent implements OnInit {

  @Input('isSubmitting') isSubmitting = false;
  @Input('disabled') disabled = false;

  @Output() pinChange = new EventEmitter<string>();

  private pinValue = '';

  get pin(): string {
    return this.pinValue;
  }

  set pin(pin: string) {
    if (!pin) {
      this.pinValue = '';
      return;
    }
    this.pinValue = pin;
    this.pinChange.emit(pin);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.pinChange.unsubscribe();
  }

  canSubmit(): boolean {
      return false;
  }
}
