import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule, MatSliderModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { MessagesService } from './messages.service';
import { MessagesComponent } from './messages.component';
import { MessageStartComponent } from './message-start/message-start.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { MessageSidenavComponent } from './sidenavs/left/message/message.component';
import { MessageUserSidenavComponent } from './sidenavs/left/user/user.component';
import { MessageLeftSidenavComponent } from './sidenavs/left/left.component';
import { MessageRightSidenavComponent } from './sidenavs/right/right.component';
import { MessageOptionsSidenavComponent } from './sidenavs/right/options/options.component';
import { LoginGuard } from 'app/login/login-guard.service';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { LayoutModule } from 'app/layout/layout.module';
import { NgxMaskModule } from 'ngx-mask';
import { SendBurstModule } from '../send-burst/send-burst.module';

const routes: Routes = [
    {
        path: 'messages',
        component: MessagesComponent,
        children: [],
        canActivate: [LoginGuard],
        resolve: {
            message: MessagesService
        }
    }
];

@NgModule({
    declarations: [
        MessagesComponent,
        MessageViewComponent,
        MessageStartComponent,
        MessageSidenavComponent,
        MessageUserSidenavComponent,
        MessageLeftSidenavComponent,
        MessageRightSidenavComponent,
        MessageOptionsSidenavComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSliderModule,
        SendBurstModule,
        LayoutModule,
        FuseSharedModule,
        I18nModule,
        NgxMaskModule,
    ],
    providers   : [
        MessagesService
    ]
})
export class MessagesModule
{
}
