import {formatNumber} from '@angular/common';
import {CurrencySymbol} from '@signumjs/util';
import { Address } from '@signumjs/core';

export interface AddressFormattingOptions {
  isShortForm: boolean;
  prefix: string;
}

const DefaultFormattingOptions = {
  isShortForm: false,
  prefix: ''
};

function shorten(s: string): string {
  return s.length > 18 ? `${s.substr(0, 4)}...${s.substr(s.length - 4)}` : s;
}


export function formatAddress(address: string, formattingOptions: AddressFormattingOptions = DefaultFormattingOptions): string {
  try{
      const prefix = formattingOptions.prefix || undefined;
      const a = Address.create(address, prefix).getReedSolomonAddress(!!prefix);
      if (formattingOptions.isShortForm){
        return shorten(a);
      }
      return a;
  }catch (e){
    console.warn('Could not format address', e.message);
    return '';
  }
}
