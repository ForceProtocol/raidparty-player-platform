import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService implements CanActivate {
  isLoggedIn = false;
  player: any;
  private token: any;

  constructor(private http: HttpClient,
    private router: Router) {
    const player = localStorage.getItem('player');
    if (player) {
      this.player = JSON.parse(player);
      this.token = localStorage.getItem('token');
      this.isLoggedIn = true;
    }
  }

  getLoggedInPlayer() {
    return this.player;
  }
  canActivate() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  signup(params) {
    return this.http.post(`${environment.API_HOST}/mob/player/signup`, params)
      .map((response) => {
        return response;
      });
  }

  login(params) {
    return this.http.post(`${environment.API_HOST}/mob/player/login`, params)
      .map((response) => {
        if (response['success']) {
          this.isLoggedIn = true;
          this.setLocalStorage(response);
        }
        return response;
      });
  }

  resetPassword(params) {
    return this.http.post(`${environment.API_HOST}/mob/player/reset-password`, params);
  }

  changePassword(params, playerId) {
    return this.http.post(`${environment.API_HOST}/mob/player/change-password?playerId=${playerId}`, params)
      .map((response: any) => {
        return response;
      });
  }

  activatePlayer(playerId, pin) {
    return this.http.post(`${environment.API_HOST}/mob/player/activate`, { playerId, pin })
      .map((response: any) => {
        return response;
      });
  }

  getToken() {
    return this.token;
  }

  logout() {
    // Api is not implemented yet so currently working with clearing localStorage
    localStorage.clear();
    this.isLoggedIn = false;
    this.player = {};
    this.token = '';
    return true;
  }

  private setLocalStorage(response) {
    this.player = response.player;
    this.token = response.token;
    localStorage.setItem('player', JSON.stringify(response.player));
    localStorage.setItem('token', response.token);
  }

}
