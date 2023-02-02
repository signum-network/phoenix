import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AppSharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        FuseConfirmDialogComponent
    ],
  imports: [
    AppSharedModule,
    MatDialogModule,
    MatButtonModule,
  ],
    entryComponents: [
        FuseConfirmDialogComponent
    ],
})
export class FuseConfirmDialogModule
{
}
