import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {some} from 'lodash';
import {
  Recipient,
  RecipientType,
  RecipientValidationStatus
} from '../../../layout/components/burst-recipient-input/burst-recipient-input.component';


@Component({
  selector: 'warn-send-dialog',
  templateUrl: 'warn-send-dialog.component.html',
  styleUrls: ['warn-send-dialog.component.scss']
})
export class WarnSendDialogComponent {
  hasUnknownAliasAccount: boolean;

  constructor(
    public dialogRef: MatDialogRef<WarnSendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipients: Array<Recipient>) {
    this.hasUnknownAliasAccount = some(recipients,
        r => r.status !== RecipientValidationStatus.VALID && r.type === RecipientType.ALIAS
    );
  }

  trackByIndex(index): number {
    return index;
  }

  getValidationClass(index: number): string {
    return 'badge ' + this.recipients[index].status.toString().toLocaleLowerCase();
  }

}
