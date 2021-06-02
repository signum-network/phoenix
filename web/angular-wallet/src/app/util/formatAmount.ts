import {formatNumber} from '@angular/common';
import {SignaSymbol} from '@signumjs/util';

export interface AmountFormattingOptions {
  isShortForm: boolean;
  noUnit: boolean;
  locale: string;
}

const DefaultFormattingOptions: AmountFormattingOptions = {
  isShortForm: false,
  noUnit: false,
  locale: 'en',
};

export function formatAmount(value: string | number, formattingOptions: AmountFormattingOptions = DefaultFormattingOptions): string {

  const v = typeof value === 'string' ? parseFloat(value) : value;
  const {isShortForm, noUnit, locale} = formattingOptions;
  const digitsInfo = isShortForm ? '1.0-6' : '1.0-8';
  const unit = noUnit ? '' : SignaSymbol + ' ';
  return `${unit}${formatNumber(v, locale, digitsInfo)}`;
}
