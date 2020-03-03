import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {formatBurstAmount} from '../../util/formatBurstAmount';

@Pipe({
  name: 'burstAmount',
  pure: false
})
export class BurstAmountPipe implements PipeTransform {

  private cachedLanguageCode: string;

  constructor(private i18nService: I18nService) {
  }

  private static hasArgument(args: any[], argName: string): boolean {
    return args.indexOf(argName) !== -1;
  }

  private shouldUpdate(): boolean {
    return this.i18nService.currentLanguage.code !== this.cachedLanguageCode;
  }

  transform(value: string | number, ...args: any[]): string {
    if (this.shouldUpdate()) {
      return formatBurstAmount(value, {
        isShortForm: BurstAmountPipe.hasArgument(args, 'short'),
        noUnit: BurstAmountPipe.hasArgument(args, 'no-unit'),
        locale: this.i18nService.currentLanguage.code
      });
    }
  }
}
