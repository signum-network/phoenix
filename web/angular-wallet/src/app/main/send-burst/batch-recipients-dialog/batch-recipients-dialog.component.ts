import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MultioutRecipientAmount} from '@burstjs/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {RecipientAmountCsvParser} from './recipientAmountCsvParser';


@Component({
  selector: 'batch-recipients-dialog',
  templateUrl: 'batch-recipients-dialog.component.html',
  styleUrls: ['batch-recipients-dialog.component.scss']
})
export class BatchRecipientsDialogComponent extends UnsubscribeOnDestroy implements OnInit {

  public formGroup = new FormGroup({
    recipientsInput: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<BatchRecipientsDialogComponent>) {
    super();
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    )
      .subscribe(() => {
        this.validateInput();
      });
  }

  private validateInput(): void {
    try {
      const data = this.formGroup.get('recipientsInput').value;
      const parser = new RecipientAmountCsvParser();
      const recipientAmounts = parser.parse(data);
      console.log(recipientAmounts);
    } catch (e) {
      console.log(e);
    }
  }
}
