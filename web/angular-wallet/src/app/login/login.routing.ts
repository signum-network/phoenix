import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
// import { CreateActiveAccountComponent } from '../dashboard/setup/account/create-active/create.component';
// import { CreatePassiveAccountComponent } from '../dashboard/setup/account/create-passive/create-passive.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'login/active', component: CreateActiveAccountComponent },
  // { path: 'login/passive', component: CreatePassiveAccountComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
