import {formatNumber} from '@angular/common';
import {CurrencySymbol} from '@signumjs/util';
import { Address } from '@signumjs/core';
import { syncMemo } from "./memo";

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
function _formatAddress(address: string, formattingOptions: AddressFormattingOptions = DefaultFormattingOptions): string {
    try{
        console.log("format address")
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
export const formatAddress = syncMemo(_formatAddress, (address: string, formattingOptions: AddressFormattingOptions) => `${address}-${formattingOptions.prefix}-${formattingOptions.isShortForm}`)
