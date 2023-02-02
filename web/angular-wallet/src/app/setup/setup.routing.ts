import { Routes, RouterModule } from '@angular/router';

import { CreateActiveAccountComponent } from './account/create-active/create.component';
import { CreatePassiveAccountComponent } from './account/create-passive/create-passive.component';
import { NgModule } from '@angular/core';
import { LoginGuard } from '../login/login-guard.service';

const routes: Routes = [
    {
        path: 'create/active',
        component: CreateActiveAccountComponent,
    },
    {
        path: 'create/passive',
        component: CreatePassiveAccountComponent,
        canActivate: [LoginGuard]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetupRouting { }

