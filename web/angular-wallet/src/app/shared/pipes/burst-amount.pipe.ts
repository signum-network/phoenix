import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {formatBurstAmount} from '../../util/formatBurstAmount';
import {convertNQTStringToNumber} from '@burstjs/util';

@Pipe({
  name: 'burstAmount',
  pure: false
})
export class BurstAmountPipe implements PipeTransform {

  private cachedLanguageCode: string;

  constructor(private i18nService: I18nService) {
  }

  private shouldUpdate(): boolean {
    return this.i18nService.currentLanguage.code !== this.cachedLanguageCode;
  }

  transform(value: string | number,
            inputType: 'planck' | 'burst' = 'burst',
            isShortForm: boolean = false,
            noUnit: boolean = false
  ): string {
    if (this.shouldUpdate()) {

      const v = inputType === 'planck' ? convertNQTStringToNumber(value.toString()) : value;

      return formatBurstAmount(v, {
        isShortForm,
        noUnit,
        locale: this.i18nService.currentLanguage.code
      });
    }
  }
}
