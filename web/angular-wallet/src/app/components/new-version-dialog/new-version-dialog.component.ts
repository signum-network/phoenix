import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class CertificationInfo {
  constructor(public isValid: boolean, public domain: string, public issuerName: string, public validThru: Date) {

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

interface AssetOption {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-new-version-dialog',
  templateUrl: './new-version-dialog.component.html',
  styleUrls: ['./new-version-dialog.component.scss']
})
export class NewVersionDialogComponent implements OnInit {
  public selectedAssetIndex: string;
  assets: AssetOption[];

  constructor(
    public dialogRef: MatDialogRef<NewVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateInfo: UpdateInfo) {

    this.assets = this.updateInfo.assets.map((url, index) => ({
        viewValue: this.getViewValue(url),
        value: index
      })
    );

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

  private getViewValue(url: string): string {
    const u = new URL(url);
    return u.pathname.substr(u.pathname.lastIndexOf('/') + 1);
  }
}
