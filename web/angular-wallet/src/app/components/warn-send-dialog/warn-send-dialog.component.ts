import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {some} from 'lodash';
import {
  Recipient,
  RecipientType,
  RecipientValidationStatus
} from 'app/components/recipient-input/recipient-input.component';


@Component({
  selector: 'warn-send-dialog',
  templateUrl: 'warn-send-dialog.component.html',
  styleUrls: ['warn-send-dialog.component.scss']
})
export class WarnSendDialogComponent {
  hasUnknownAliasAccount: boolean;
  hasBurnAccount: boolean;

  constructor(
    public dialogRef: MatDialogRef<WarnSendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipients: Array<Recipient>) {
    this.hasUnknownAliasAccount = some(recipients,
        r => r.status !== RecipientValidationStatus.VALID && r.type === RecipientType.ALIAS
    );
    this.hasBurnAccount = some(recipients, r => r.status === RecipientValidationStatus.BURN);
  }

  trackByIndex(index): number {
    return index;
  }

  getValidationClass(index: number): string {
    return 'badge ' + this.recipients[index].status.toString().toLocaleLowerCase();
  }

}
