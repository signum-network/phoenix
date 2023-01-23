import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';

@NgModule({
    declarations: [
        FuseConfirmDialogComponent
    ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    I18nModule
  ],
    entryComponents: [
        FuseConfirmDialogComponent
    ],
})
export class FuseConfirmDialogModule
{
}
