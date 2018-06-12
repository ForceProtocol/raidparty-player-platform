import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { GamesComponent } from '../games/games.component';
import { MarketplaceComponent } from '../marketplace/marketplace.component';
import { WalletComponent } from '../wallet/wallet.component';
import { ActivateAccountComponent } from '../auth/activate-account/activate-account.component';
import { HowToComponent } from '../how-to/how-to.component';
import { AuthService } from '../services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'activate-player', component: ActivateAccountComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
  { path: 'games', component: GamesComponent, canActivate: [AuthService] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthService] },
  { path: 'marketplace', component: MarketplaceComponent, canActivate: [AuthService] },
  { path: 'how-to', component: HowToComponent, canActivate: [AuthService] },
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
