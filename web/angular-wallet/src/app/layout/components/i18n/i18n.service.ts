import {Injectable, ApplicationRef} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { constants } from '../../../constants';
import { StoreService } from 'app/store/store.service';
import { Settings } from 'app/settings';
export interface Language {
    name: string,
    code: string
}

@Injectable()
export class I18nService {

  public state;
  public data:{};
  public currentLanguage:any;


  constructor(
      private http: HttpClient, 
      private ref: ApplicationRef,
      private storeService: StoreService
    ) {
    this.state = new Subject();

    this.initLanguage(constants.defaultLanguage || 'en');

    this.storeService.getSettings().then(s => {
          this.initLanguage(s.language);
    });

    this.fetch(this.currentLanguage.code)
  }

  private fetch(locale: any) {
    this.http.get( `/locales/${locale}.json` )
      .subscribe((data:any)=> {
        this.data = data;
        this.state.next(data);
        this.ref.tick()
      })
  }

  private initLanguage(locale:string) {
    let language = constants.languages.find((it)=> {
      return it.code == locale
    });
    if (language) {
      this.setLanguage(language);
    } else {
      throw new Error(`Incorrect locale used for I18nService: ${locale}`);
    }
  }

  setLanguage(language){
    this.currentLanguage = language;
    this.storeService.getSettings()
        .then(s => {
            this.storeService.saveSettings(new Settings({...s, language: language.code}));
        });
    this.fetch(language.code);
  }

  subscribe(sub:any, err:any) {
    return this.state.subscribe(sub, err)
  }

  public getTranslation(phrase:string, opts?:object):string {
    return this.data && this.data[phrase] ? this.data[phrase] : phrase
  }

}
