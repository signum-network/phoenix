import {formatNumber} from '@angular/common';
import {BurstSymbol} from '@burstjs/util';

export interface BurstAmountFormattingOptions {
  isShortForm: boolean;
  noUnit: boolean;
  locale: string;
}

const DefaultFormattingOptions: BurstAmountFormattingOptions = {
  isShortForm: false,
  noUnit: false,
  locale: 'en',
};

export function formatBurstAmount(value: string | number, formattingOptions: BurstAmountFormattingOptions = DefaultFormattingOptions): string {
  const v = typeof value === 'string' ? parseFloat(value) : value;
  const {isShortForm, noUnit, locale} = formattingOptions;
  const digitsInfo = isShortForm ? '1.0-6' : '1.0-8';
  const unit = noUnit ? '' : BurstSymbol + ' ';
  return `${unit}${formatNumber(v, locale, digitsInfo)}`;
}
