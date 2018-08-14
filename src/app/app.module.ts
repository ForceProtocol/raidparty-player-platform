import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
import { EventService } from './services/eventEmitter.service';
import { AppInterceptor } from './services/app.interceptor';
import { NotificationService } from './services/notification.service';
import { HelperService } from './services/helper.service';

import { ToastrModule } from 'ngx-toastr';

import { FooterComponent } from './headers/footer/footer.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { MarketplaceSearchNavbarComponent } from './marketplace-search-navbar/marketplace-search-navbar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { WalletComponent } from './wallet/wallet.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HowToComponent } from './how-to/how-to.component';
import { FormsModule } from '@angular/forms';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { OrderProductModalComponent } from './order-product-modal/order-product-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    FooterComponent,
    SideNavbarComponent,
    MarketplaceSearchNavbarComponent,
    TopNavbarComponent,
    DashboardComponent,
    GamesComponent,
    WalletComponent,
    MarketplaceComponent,
    ActivateAccountComponent,
    NotificationsComponent,
    HowToComponent,
	OrderProductModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    FormsModule
  ],
  providers: [AuthService, GameService, ProductService, PlayerService, EventService, NotificationService, NgxSmartModalService, HelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
