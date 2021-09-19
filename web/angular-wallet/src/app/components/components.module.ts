import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {SubmitTransactionComponent} from './submit-transaction/submit-transaction.component';
import {RouterModule} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {RecipientInputComponent} from './recipient-input/recipient-input.component';
import {AmountInputComponent} from './amount-input/amount-input.component';
import {Ng5SliderModule} from 'ng5-slider';
import {AppSharedModule} from '../shared/shared.module';
import {FeeSelectorComponent} from './fee-selector/fee-selector.component';
import {PageComponent} from './page/page.component';
import {WarnSendDialogComponent} from './warn-send-dialog/warn-send-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { WatermarkComponent } from './watermark/watermark.component';

@NgModule({
  declarations: [
    SubmitTransactionComponent,
    RecipientInputComponent,
    AmountInputComponent,
    FeeSelectorComponent,
    PageComponent,
    WarnSendDialogComponent,
    WatermarkComponent,
  ],
  exports: [
    SubmitTransactionComponent,
    RecipientInputComponent,
    AmountInputComponent,
    FeeSelectorComponent,
    PageComponent,
    WarnSendDialogComponent,
    WatermarkComponent,
  ],
  imports: [
    AppSharedModule,
    CommonModule,
    FlexModule,
    FormsModule,
    I18nModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    Ng5SliderModule,
    RouterModule,
    MatDialogModule,
  ],
  entryComponents: [
    WarnSendDialogComponent
  ]
})
export class ComponentsModule {
}
