import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipient } from '../recipient-input/recipient-input.component';
import { WalletContact } from 'app/util/WalletContact';

@Component({
  selector: 'add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.scss']
})
export class AddContactDialogComponent {

  accountId = '';
  name = '';
  constructor(
    public dialogRef: MatDialogRef<AddContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) accountId: string
  ) {
    this.accountId = accountId || '';
  }

  onRecipientChange(address: Recipient): void {
    this.accountId = address.addressId;
  }

  onSubmit(): void {
    this.dialogRef.close(new WalletContact({
        name: this.name,
        account: this.accountId
      })
    );
  }
}
