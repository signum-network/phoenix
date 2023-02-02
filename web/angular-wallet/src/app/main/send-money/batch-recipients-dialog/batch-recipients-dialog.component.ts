import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MultioutRecipientAmount} from '@signumjs/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {RecipientAmountCsvParser} from './recipientAmountCsvParser';
import {I18nService} from '../../../shared/services/i18n.service';

const DelimiterMap = {
  comma: ',',
  semicolon: ';',
  tabulator: '\t',
};


interface DelimiterOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'batch-recipients-dialog',
  templateUrl: 'batch-recipients-dialog.component.html',
  styleUrls: ['batch-recipients-dialog.component.scss']
})
export class BatchRecipientsDialogComponent extends UnsubscribeOnDestroy implements OnInit {

  public formGroup = new FormGroup({
    delimiter: new FormControl(),
    recipientsInput: new FormControl()
  });
  delimiters: DelimiterOption[];
  isValid = false;
  message = '';
  private result: MultioutRecipientAmount[] = [];

  constructor(public dialogRef: MatDialogRef<BatchRecipientsDialogComponent>, private translationService: I18nService) {
    super();
  }

  ngOnInit(): void {

    this.initializeDelimiterOptions();
    this.message = this.translationService.getTranslation('select_recipients');
    this.formGroup.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
      this.validateInput();
    });
  }

  private validateInput(): void {
    try {
      const recipients = this.formGroup.get('recipientsInput').value;
      if (!recipients) {
        this.message = this.translationService.getTranslation('select_recipients');
        return;
      }
      const delimiter = this.formGroup.get('delimiter').value;
      const parser = new RecipientAmountCsvParser(this.translationService, {
        delimiter: DelimiterMap[delimiter],
        lineBreak: '\n'
      });
      const recipientAmounts = parser.parse(recipients);
      this.isValid = true;
      this.message = `${recipientAmounts.length} ${this.translationService.getTranslation('recipients')}`;
      this.result = recipientAmounts;
    } catch (e) {
      this.isValid = false;
      this.message = e.message;
    }
  }

  private initializeDelimiterOptions(): void {
    const options = ['comma', 'semicolon', 'tabulator'];
    this.delimiters = options.map(o => ({
      viewValue: this.translationService.getTranslation(o),
      value: o
    }));

    this.formGroup.controls['delimiter'].setValue('comma');
  }

  public submit(): void {
    this.dialogRef.close(this.result);
  }
}
