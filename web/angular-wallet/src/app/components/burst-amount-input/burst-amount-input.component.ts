import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {NumberSeparator} from '../../layout/components/i18n/locales';

@Component({
  selector: 'burst-amount-input',
  templateUrl: './burst-amount-input.component.html',
  styleUrls: ['./burst-amount-input.component.scss']
})
export class BurstAmountInputComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() immutable = false;
  @Input() withSpendAll = true;

  @Output() spendAllClick = new EventEmitter;
  @Output() amountBurstChange = new EventEmitter();

  @Input()
  get amountBurst(): string {
    return this.value;
  }

  set amountBurst(value: string) {
    this.ref.detach()
    this.value = value;
  }

  value: string;
  numberSeparator: NumberSeparator;

  constructor(private i18nService: I18nService, private ref: ChangeDetectorRef) {
    this.numberSeparator = i18nService.getNumberSeparator();
  }

  ngOnInit(): void {
    this.i18nService.subscribe(() => {
      this.numberSeparator = this.i18nService.getNumberSeparator();
      const backupValue = this.value;
        console.log('backup', backupValue);
      setTimeout(() => {
        this.value = backupValue;
      }, 0);
    }, null);
  }

  ngAfterViewInit(): void {
  }

  public showSpendAll(): boolean {
    return !this.immutable && this.withSpendAll;
  }

  onValueChange($event: any): void {
    console.log('value', this.value);
    this.amountBurstChange.emit(this.value);
  }

  onSpendAllClick(): void {
    this.spendAllClick.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('onchange', changes, this.value);
  }


}
