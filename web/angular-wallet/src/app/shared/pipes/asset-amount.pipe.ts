import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {formatDecimals} from 'app/util/formatDecimals';
import {formatNumber} from '@angular/common';

@Pipe({
  name: 'assetAmount',
  pure: false
})
export class AssetAmountPipe implements PipeTransform {

  private cachedLanguageCode: string;

  constructor(private i18nService: I18nService) {
  }

  private shouldUpdate(): boolean {
    return this.i18nService.currentLanguage.code !== this.cachedLanguageCode;
  }

  transform(value: number,
            decimals: number
  ): string {
    if (this.shouldUpdate()) {
      const v = formatDecimals(value, decimals);
      return formatNumber(v, this.i18nService.currentLanguage.code);
    }
  }
}
