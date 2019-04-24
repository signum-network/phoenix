import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule} from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import {I18nModule} from '../i18n/i18n.module';

@NgModule({
    declarations: [
        ToolbarComponent
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
    I18nModule
  ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
