import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginActiveComponent } from './login-active/login-active.component';
import { LoginPassiveComponent } from './login-passive/login-passive.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'login/active', component: LoginActiveComponent
  },
  {
    path: 'login/passive', component: LoginPassiveComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
