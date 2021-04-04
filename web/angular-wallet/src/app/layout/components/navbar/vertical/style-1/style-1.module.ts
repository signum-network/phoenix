import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FuseNavigationModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarVerticalStyle1Component } from 'app/layout/components/navbar/vertical/style-1/style-1.component';
import { RouterModule } from '@angular/router';
import {I18nModule} from '../../../i18n/i18n.module';
import {AppSharedModule} from '../../../../../shared/shared.module';
import {MatTooltipModule} from '@angular/material';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,

        RouterModule,

        FuseSharedModule,
        FuseNavigationModule,
        I18nModule,
        AppSharedModule,
        MatTooltipModule
    ],
    exports     : [
        NavbarVerticalStyle1Component
    ]
})
export class NavbarVerticalStyle1Module
{
}
