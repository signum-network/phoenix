import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {I18nModule} from '../../layout/components/i18n/i18n.module';
import { MatIconModule } from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {FeeSelectorComponent} from './fee-selector.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Ng5SliderModule} from 'ng5-slider';
import {AppSharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [FeeSelectorComponent],
  exports: [
    FeeSelectorComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    MatIconModule,
    RouterModule,
    FlexModule,
    MatTooltipModule,
    Ng5SliderModule,
    AppSharedModule
  ]
})
export class FeeSelectorModule {
}
