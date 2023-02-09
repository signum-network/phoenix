import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { I18nService } from 'app/shared/services/i18n.service';
import { StoreService } from 'app/store/store.service';

@Component({
  selector: 'settings-danger-zone',
  templateUrl: './danger-zone.component.html',
  styleUrls: ['./danger-zone.component.scss']
})
export class DangerZoneComponent {

  constructor(
    private i18nService: I18nService,
    private storeService: StoreService,
    private warnDialog: MatDialog,
    private router: Router
  ) { }

  resetWallet(): void {
    const ref = this.warnDialog.open(FuseConfirmDialogComponent, {
      width: '400px', data: {
        title: this.i18nService.getTranslation('reset_wallet'),
        message: this.i18nService.getTranslation('reset_wallet_hint')
      }
    });

    ref.afterClosed()
      .subscribe(async (confirmed) => {
        if (confirmed) {
          await this.storeService.reset();
          await this.router.navigate(['/'], {replaceUrl: true});
          window.location.reload();
        }
      });
  }
}
