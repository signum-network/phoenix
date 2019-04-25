import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { FuseNavigationModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarVerticalStyle1Component } from 'app/layout/components/navbar/vertical/style-1/style-1.component';
import { RouterModule } from '@angular/router';
import {I18nModule} from '../../../i18n/i18n.module';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
  imports: [
    MatButtonModule,
    MatIconModule,

    RouterModule,

    FuseSharedModule,
    FuseNavigationModule,
    I18nModule
  ],
    exports     : [
        NavbarVerticalStyle1Component
    ]
})
export class NavbarVerticalStyle1Module
{
}
