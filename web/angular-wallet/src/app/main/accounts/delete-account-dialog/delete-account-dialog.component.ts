import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedAccounts: Account[]) { }

  ngOnInit() {
  }

}
