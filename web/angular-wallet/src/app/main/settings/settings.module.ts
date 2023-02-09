import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatListModule, MatDividerModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {ComponentsModule} from 'app/components/components.module';
import { AppSharedModule } from 'app/shared/shared.module';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { MatTabsModule } from '@angular/material/tabs';
import { NodeSelectorComponent } from './node-selector/node-selector.component';
import { DangerZoneComponent } from './danger-zone/danger-zone.component';
import { DesktopComponent } from './desktop/desktop.component';

const routes = [
  {
    path: '',
    component: SettingsComponent,
  }
];

@NgModule({
  declarations: [SettingsComponent, NodeSelectorComponent, DangerZoneComponent, DesktopComponent],
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
    FuseConfirmDialogModule,
    MatTabsModule
  ],
  providers: [],
  entryComponents: [
    FuseConfirmDialogComponent
  ]
})
export class SettingsModule {
}
