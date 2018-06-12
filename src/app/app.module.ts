import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';
import { EventService } from './services/eventEmitter.service';
import { AppInterceptor } from './services/app.interceptor';
import { NotificationService } from './services/notification.service';

import { ToastrModule } from 'ngx-toastr';

import { FooterComponent } from './headers/footer/footer.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { WalletComponent } from './wallet/wallet.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HowToComponent } from './how-to/how-to.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    FooterComponent,
    SideNavbarComponent,
    TopNavbarComponent,
    DashboardComponent,
    GamesComponent,
    WalletComponent,
    MarketplaceComponent,
    ActivateAccountComponent,
    NotificationsComponent,
    HowToComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, GameService, EventService, NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
