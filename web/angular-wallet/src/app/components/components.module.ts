import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
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
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { AddressComponent } from './address/address.component';
import { MatMenuModule } from "@angular/material/menu";
import { ContactSelectorComponent } from './recipient-input/contact-selector/contact-selector.component';


@NgModule({
  declarations: [
    AddContactDialogComponent,
    AddressComponent,
    AmountInputComponent,
    CustomDescriptionFormComponent,
    EditContactDialogComponent,
    FeeInputComponent,
    JsonDescriptionFormComponent,
    LinkButtonComponent,
    MessageInputComponent,
    PageComponent,
    RecipientInputComponent,
    SubmitTransactionComponent,
    WarnSendDialogComponent,
    WatermarkComponent,
    ContactSelectorComponent,
  ],
  exports: [
    AddContactDialogComponent,
    AddressComponent,
    AmountInputComponent,
    CustomDescriptionFormComponent,
    EditContactDialogComponent,
    FeeInputComponent,
    JsonDescriptionFormComponent,
    LinkButtonComponent,
    MessageInputComponent,
    PageComponent,
    RecipientInputComponent,
    SubmitTransactionComponent,
    WarnSendDialogComponent,
    WatermarkComponent,
  ],
  imports: [
    AppSharedModule,
    CommonModule,
    FlexModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    Ng5SliderModule,
    NgJsonEditorModule,
    RouterModule,
    MatMenuModule
  ],
  entryComponents: [
    AddContactDialogComponent,
    EditContactDialogComponent,
    WarnSendDialogComponent,
  ]
})
export class ComponentsModule {
}
