import { Routes, RouterModule } from '@angular/router';

import { CreateActiveAccountComponent } from './account/create-active/create.component';
import { CreatePassiveAccountComponent } from './account/create-passive/create-passive.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'create/active',
        component: CreateActiveAccountComponent
    },
    {
        path: 'create/passive',
        component: CreatePassiveAccountComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetupRouting { }

