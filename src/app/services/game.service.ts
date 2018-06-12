import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()
export class GameService {

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

  getUserPlayedGames(device) {
    return this.http.get(`${environment.API_HOST}/player/playerGames?token=${this.auth.getToken()}&playerId=${this.player.id}&device_type=${device}`)
      .map((response) => response);
  }

  getAllGames(platformFilter) {
    return this.http.get(`${environment.API_HOST}/mob/player/games?token=${this.auth.getToken()}&device_type=${platformFilter}`)
      .map(response => response);
  }

  getGameRewardsProgress(rewardcampaignId) {
    console.log(this.player.id);
    return this.http.get(
      `${environment.API_HOST}/player/trackProgress?token=${this.auth.getToken()}&player=${this.player.id}&rewardCampaign=${rewardcampaignId}`
    )
      .map((response) => response);
  }

}
