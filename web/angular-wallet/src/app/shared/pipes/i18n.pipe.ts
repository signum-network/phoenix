import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../services/i18n.service';

@Pipe({
  name: 'i18n',
  pure: false,
})
export class I18nPipe implements PipeTransform {

  constructor(private i18nService: I18nService) {
  }

  transform(phrase: any, args?: any): any {
    return this.i18nService.getTranslation(phrase);
  }

}
