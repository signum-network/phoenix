import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export class UpdateInfo {
  constructor(public currentVersion: string,
              public newVersion: string,
              public assets: string[],
              public releaseUrl: string ){
  }
}

@Component({
  selector: 'app-new-version-dialog',
  templateUrl: './new-version-dialog.component.html',
  styleUrls: ['./new-version-dialog.component.scss']
})
export class NewVersionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateInfo: UpdateInfo) {
  }

  trackByIndex(index): number {
    return index;
  }

  ngOnInit(): void {
  }

}
