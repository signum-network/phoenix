import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import {I18nModule} from '../i18n/i18n.module';
import {MatDividerModule} from '@angular/material/divider';
import { AccountSelectorItemComponent } from './account-selector-item/account-selector-item.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        AccountSelectorItemComponent
    ],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    FuseSharedModule,
    FuseSearchBarModule,
    FuseShortcutsModule,
    I18nModule,
    MatDividerModule
  ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
