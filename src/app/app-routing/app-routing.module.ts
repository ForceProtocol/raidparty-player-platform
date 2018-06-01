import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { AuthService } from '../services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'activate-developer', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
