import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginActiveComponent } from './login-active/login-active.component';
import { LoginPassiveComponent } from './login-passive/login-passive.component';
import { LoginGuard } from './login-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'login/active', component: LoginActiveComponent, canActivate: [LoginGuard]
  },
  {
    path: 'login/passive', component: LoginPassiveComponent, canActivate: [LoginGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
