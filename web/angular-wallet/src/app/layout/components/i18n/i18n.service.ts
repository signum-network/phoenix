import {Injectable, ApplicationRef} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {constants} from '../../../constants';
import {StoreService} from 'app/store/store.service';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface Language {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  // public state = new BehaviorSubject(null);
  public currentLanguage: Language = {
    name: 'default',
    code: 'en'
  };

  private translations = {};

  constructor(
    private http: HttpClient,
    private ref: ApplicationRef,
    private storeService: StoreService
  ) {
    this.storeService.ready$.subscribe(ready => {
      if (!ready) {
        return;
      }
      const {language} = this.storeService.getSettings();
      this.initLanguage(language);
    });
  }

  private fetch(locale: any): void {
  }

  private initLanguage(locale: string): void {
    const language = constants.languages.find(it => it.code === locale);
    this.setLanguage(language || 'en');
  }

  setLanguage(language): void {
    this.currentLanguage = language;
    const settings = this.storeService.getSettings();
    settings.language = language.code;
    this.http.get(`locales/${language.code}.json`)
      .subscribe((data: any) => {
        this.translations = data;
        this.storeService.updateSettings({ language: language.code });
      });
  }

  public getTranslation(phrase: string, opts?: any): string {
    const data = this.translations;
    return data && data[phrase] ? data[phrase] : phrase;
  }

}
