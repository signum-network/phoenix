import {NgModule} from '@angular/core';

import {VerticalLayout1Module} from 'app/layout/vertical/layout-1/layout-1.module';
import {VerticalLayout2Module} from 'app/layout/vertical/layout-2/layout-2.module';
import {VerticalLayout3Module} from 'app/layout/vertical/layout-3/layout-3.module';

import {HorizontalLayout1Module} from 'app/layout/horizontal/layout-1/layout-1.module';
import {Ng5SliderModule} from 'ng5-slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {I18nModule} from './components/i18n/i18n.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RecipientInputComponent} from './components/recipient-input/recipient-input.component';
import {BurstFeeSelectorComponent} from './components/burst-fee-selector/burst-fee-selector.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material';
import {AppSharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    VerticalLayout1Module,
    VerticalLayout2Module,
    VerticalLayout3Module,

    HorizontalLayout1Module,
    Ng5SliderModule,
    MatTooltipModule,
    MatIconModule,
    I18nModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FlexLayoutModule,
    MatProgressBarModule,
    AppSharedModule,
  ],
  exports: [
    VerticalLayout1Module,
    VerticalLayout2Module,
    VerticalLayout3Module,
    HorizontalLayout1Module,
    BurstFeeSelectorComponent,
    RecipientInputComponent,
  ],
  declarations: [
    BurstFeeSelectorComponent,
    RecipientInputComponent,
  ]
})
export class LayoutModule {
}
