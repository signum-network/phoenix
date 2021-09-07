import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencySymbol} from '@signumjs/util';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})
export class AmountInputComponent implements OnInit {
  @Input() symbol = CurrencySymbol;
  @Input() maxAmount: string | number = '0';
  @Input() amount: string;
  @Input() disabled = false;

  @Output() amountChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSpendAll(): void {
    this.amount = this.maxAmount.toString();
    this.onChange(this.amount);
  }

  onChange(amount: string): void {
    this.amountChange.next(amount);
  }
}
