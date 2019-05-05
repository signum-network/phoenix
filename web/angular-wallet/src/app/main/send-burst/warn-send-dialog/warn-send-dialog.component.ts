import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Recipient} from '../typings';


@Component({
  selector: 'warn-send-dialog',
  templateUrl: 'warn-send-dialog.component.html',
})
export class WarnSendDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WarnSendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipients: Array<Recipient>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
