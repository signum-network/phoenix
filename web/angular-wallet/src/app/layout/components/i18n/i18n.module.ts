import {NgModule} from '@angular/core';

import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {I18nPipe} from './i18n.pipe';
import {CommonModule} from '@angular/common';

export interface Language {
  name: string;
  code: string;
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LanguageSelectorComponent,
    I18nPipe
  ],
  exports: [LanguageSelectorComponent, I18nPipe],
})
export class I18nModule {
}
