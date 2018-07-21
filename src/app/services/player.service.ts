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
  playerForceBalance: any;

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


  getPlayer(){
    let playerData = this.http.get(`${environment.API_HOST}/web/player?token=${this.token}`)
    .map(response => response);
    return playerData;
  }

  getPlayerForceBalance() {
    return this.http.get(`${environment.API_HOST}/web/player?token=${this.token}`)
    .map(response => response);
  }


  canBuyProduct(productId){
    this.playerForceBalance = this.getPlayerForceBalance();
  }


  confirmPlayerOrder(productId){
    return this.http.post(`${environment.API_HOST}/web/player/confirm-order?token=${this.token}`,{token:this.token,productId:productId})
    .map(response => response);
  }

}
