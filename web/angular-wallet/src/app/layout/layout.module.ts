import {NgModule} from '@angular/core';

import {VerticalLayout1Module} from 'app/layout/vertical/layout-1/layout-1.module';
import {Ng5SliderModule} from 'ng5-slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material';
import {AppSharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    VerticalLayout1Module,
    Ng5SliderModule,
    MatTooltipModule,
    MatIconModule,
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
  ],
  declarations: []
})
export class LayoutModule {
}
