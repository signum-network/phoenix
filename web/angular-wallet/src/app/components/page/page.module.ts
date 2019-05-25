import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {I18nModule} from '../../layout/components/i18n/i18n.module';
import {MatIconModule} from '@angular/material';
import {PageComponent} from './page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PageComponent],
  exports: [
    PageComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    MatIconModule,
    RouterModule
  ]
})
export class PageModule { }
