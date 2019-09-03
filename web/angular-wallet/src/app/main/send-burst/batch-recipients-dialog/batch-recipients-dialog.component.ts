import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'batch-recipients-dialog',
  templateUrl: 'batch-recipients-dialog.component.html',
  styleUrls: ['batch-recipients-dialog.component.scss']
})
export class BatchRecipientsDialogComponent {
  constructor(public dialogRef: MatDialogRef<BatchRecipientsDialogComponent>) {
  }
}
