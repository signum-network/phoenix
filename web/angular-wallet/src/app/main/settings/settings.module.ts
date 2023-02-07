import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {RouterModule} from '@angular/router';
import {SettingsResolver} from './settings.resolver';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatListModule, MatDividerModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {ComponentsModule} from 'app/components/components.module';
import { AppSharedModule } from 'app/shared/shared.module';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseConfirmDialogModule } from "@fuse/components";

const routes = [
  {
    path: '',
    component: SettingsComponent,
    resolve: {
      settings: SettingsResolver
    },
  }
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    AppSharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FuseSharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatListModule,
    FuseConfirmDialogModule
  ],
  providers: [
    SettingsResolver,
  ],
  entryComponents: [
    FuseConfirmDialogComponent
  ]
})
export class SettingsModule {
}
