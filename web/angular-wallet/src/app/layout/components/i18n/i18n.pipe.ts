import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from './i18n.service';

@Pipe({
  name: 'i18n',
  pure: false
})
export class I18nPipe implements PipeTransform {

  private cachedLanguageCode: string;

  constructor(public i18nService: I18nService) {
    // this.i18nService.subscribe((data) =>
    //   // console.log('I18nPipe', data), null
    // );
  }


  private shouldUpdate(): boolean {
    return this.i18nService.currentLanguage.code !== this.cachedLanguageCode;
  }


  transform(phrase: any, args?: any): any {
    // if (!this.shouldUpdate()) { return; }
    return this.i18nService.getTranslation(phrase);
  }

}
