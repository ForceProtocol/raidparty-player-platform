import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()
export class NotificationService {

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

  getPlayerNotifications() {
    return this.http.get(`${environment.API_HOST}/web/player/notifications?token=${this.auth.getToken()}`)
      .map(response => response);
  }

  deleteNotification(notificationId) {
    return this.http.post(`${environment.API_HOST}/web/player/notification/delete?token=${this.auth.getToken()}`
      , { notification_id: notificationId })
      .map(response => response);
  }

}
