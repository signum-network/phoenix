import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export class CertificationInfo {
  constructor(public domain: string, public issuerName: string, public validThru: Date) {

  }

  public isValid(): boolean {
    return (this.domain && this.domain.length > 0) &&
      (this.issuerName && this.issuerName.length > 0) &&
      (new Date() > this.validThru);
  }
}

export class UpdateInfo {
  constructor(public currentVersion: string,
              public newVersion: string,
              public os: string,
              public assets: string[],
              public releaseUrl: string,
              public certInfo: CertificationInfo,
  ) {
  }
}

@Component({
  selector: 'app-new-version-dialog',
  templateUrl: './new-version-dialog.component.html',
  styleUrls: ['./new-version-dialog.component.scss']
})
export class NewVersionDialogComponent implements OnInit {
  asset: string;

  constructor(
    public dialogRef: MatDialogRef<NewVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateInfo: UpdateInfo) {
  }

  ngOnInit(): void {
  }

  get platform(): string {
    switch (this.updateInfo.os) {
      case 'win':
        return 'Windows';
      case 'mac':
        return 'MacOS';
      case 'linux':
        return 'Linux';
      default:
        return 'Unknown Platform';
    }
  }


}
