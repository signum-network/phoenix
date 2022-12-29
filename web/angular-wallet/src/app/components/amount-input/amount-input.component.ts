import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencySymbol } from '@signumjs/util';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})
export class AmountInputComponent implements OnInit {
  @Input() symbol = CurrencySymbol;
  @Input() maxAmount?: string | number;
  @Input() amount: string;
  @Input() disabled = false;

  @Output() amountChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSpendAll(): void {
    if (this.maxAmount) {
      this.amount = this.maxAmount.toString();
      this.onChange(this.amount);
    }
  }

  onChange(amount: string): void {
    this.amountChange.next(amount);
  }
}
