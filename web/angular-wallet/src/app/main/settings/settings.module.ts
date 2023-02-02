import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {RouterModule} from '@angular/router';
import {SettingsResolver} from './settings.resolver';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatListModule, MatDividerModule} from '@angular/material';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {ComponentsModule} from '../../components/components.module';
import { AppSharedModule } from "../../shared/shared.module";

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
    MatListModule
  ],
  providers: [
    SettingsResolver,
  ]
})
export class SettingsModule {
}
