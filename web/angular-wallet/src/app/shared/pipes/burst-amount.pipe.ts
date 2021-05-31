import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {formatAmount} from '../../util/formatAmount';
import {Amount} from '@burstjs/util';

// FIXME: rename to signa
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

      const v = inputType === 'planck' ? Amount.fromPlanck(value).getSigna() : value;

      return formatAmount(v, {
        isShortForm,
        noUnit,
        locale: this.i18nService.currentLanguage.code
      });
    }
  }
}
