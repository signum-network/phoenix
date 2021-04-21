import {NgModule} from '@angular/core';
import {SubmitTransactionComponent} from './submit-transaction.component';
import {MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {I18nModule} from '../../layout/components/i18n/i18n.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SubmitTransactionComponent],
  exports: [
    SubmitTransactionComponent
  ],
  imports: [
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    I18nModule,
    FormsModule,
    CommonModule
  ]
})
export class SubmitTransactionModule {
}
