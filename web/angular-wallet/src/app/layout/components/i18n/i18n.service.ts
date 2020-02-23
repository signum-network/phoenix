import {ApplicationRef, Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {constants} from '../../../constants';
import {StoreService} from 'app/store/store.service';
import {getLocaleNumberFormat, NumberFormatStyle} from '@angular/common';
import {CurrencyMaskConfig} from 'ngx-currency';

export interface Language {
  name: string;
  code: string;
}

const DefaultCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 8,
  prefix: 'BURST ',
  suffix: '',
  thousands: '.',
  nullable: true
};


@Injectable()
export class I18nService {

  public state;
  public data: {};
  public currentLanguage: Language;


  constructor(
    private http: HttpClient,
    private ref: ApplicationRef,
    private storeService: StoreService
  ) {
    this.state = new Subject();

    this.storeService.ready.subscribe(async ready => {
      if (!ready) {
        return;
      }
      const {language} = await this.storeService.getSettings();
      this.initLanguage(language);
      this.fetch(this.currentLanguage.code);
    });
  }

  private fetch(locale: any): void {
    this.http.get(`locales/${locale}.json`)
      .subscribe((data: any) => {
        this.data = data;
        this.state.next(data);
        this.ref.tick();
      });
  }

  private initLanguage(locale: string): void {
    const language = constants.languages.find(it => it.code === locale);
    if (language) {
      this.setLanguage(language);
    } else {
      throw new Error(`Incorrect locale used for I18nService: ${locale}`);
    }
  }

  async setLanguage(language): Promise<void> {
    this.currentLanguage = language;
    const settings = await this.storeService.getSettings();
    settings.language = language.code;
    await this.storeService.saveSettings(settings);
    this.fetch(language.code);
  }

  getCurrencyMask(): any {
    const numberFormat = getLocaleNumberFormat(this.currentLanguage.code, NumberFormatStyle.Decimal);

    console.log('getCurrencyMask', this.currentLanguage.code,  numberFormat);
    const config: CurrencyMaskConfig = {
      ...DefaultCurrencyMaskConfig,
      // thousands: numberFormat
    };
    return config;
  }

  subscribe(sub: any, err: any): any {
    return this.state.subscribe(sub, err);
  }

  public getTranslation(phrase: string, opts?: object): string {
    return this.data && this.data[phrase] ? this.data[phrase] : phrase;
  }

}
