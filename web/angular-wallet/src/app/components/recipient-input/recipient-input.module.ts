import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {I18nModule} from '../../layout/components/i18n/i18n.module';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {RecipientInputComponent} from './recipient-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [RecipientInputComponent],
  exports: [
    RecipientInputComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    MatIconModule,
    RouterModule,
    FlexModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule
  ]
})
export class RecipientInputModule {
}
