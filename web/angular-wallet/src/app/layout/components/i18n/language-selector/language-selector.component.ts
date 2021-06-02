import {Component, OnInit} from '@angular/core';
import {constants} from '../../../../constants';
import {I18nService} from '../i18n.service';

@Component({
  selector: 'burst-language-selector',
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent implements OnInit {

  public languages: Array<any>;
  public currentLanguage: any;

  constructor(private i18n: I18nService) {
  }

  ngOnInit(): void {
    this.languages = constants.languages;
    this.currentLanguage = this.i18n.currentLanguage;
  }

  setLanguage(language): void {
    this.currentLanguage = language;
    this.i18n.setLanguage(language);
  }

}
