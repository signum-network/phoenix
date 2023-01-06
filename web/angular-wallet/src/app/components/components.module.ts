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
import {PageComponent} from './page/page.component';
import {WarnSendDialogComponent} from './warn-send-dialog/warn-send-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { WatermarkComponent } from './watermark/watermark.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import { FeeInputComponent } from './fee-input/fee-input.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomDescriptionFormComponent } from './custom-description-form/custom-description-form.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { JsonDescriptionFormComponent } from './json-description-form/json-description-form.component';
import { PublickeyInputComponent } from './publickey-input/publickey-input.component';


@NgModule({
  declarations: [
    SubmitTransactionComponent,
    RecipientInputComponent,
    AmountInputComponent,
    PageComponent,
    WarnSendDialogComponent,
    WatermarkComponent,
    LinkButtonComponent,
    FeeInputComponent,
    MessageInputComponent,
    CustomDescriptionFormComponent,
    JsonDescriptionFormComponent,
    PublickeyInputComponent
  ],
  exports: [
    SubmitTransactionComponent,
    RecipientInputComponent,
    AmountInputComponent,
    PageComponent,
    WarnSendDialogComponent,
    WatermarkComponent,
    LinkButtonComponent,
    FeeInputComponent,
    MessageInputComponent,
    CustomDescriptionFormComponent,
    JsonDescriptionFormComponent,
    PublickeyInputComponent
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
    MatCheckboxModule,
    NgJsonEditorModule
  ],
  entryComponents: [
    WarnSendDialogComponent
  ]
})
export class ComponentsModule {
}
