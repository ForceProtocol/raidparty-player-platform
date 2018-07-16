import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()
export class PlayerService {

  player: any;
  token: any;

  constructor(
    private http: HttpClient,
    private ruoter: Router,
    private auth: AuthService
  ) {
    const player = localStorage.getItem('player');
    if (player) {
      this.player = JSON.parse(player);
      this.token = localStorage.getItem('token');
    }
  }

  getPlayerForceBalance() {
    return this.http.get(`${environment.API_HOST}/web/player?token=${this.token}`)
      .map(response => response);
  }

}
