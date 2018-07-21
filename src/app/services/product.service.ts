import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()
export class ProductService {

  player: any;
  token: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {
    const player = localStorage.getItem('player');
    if (player) {
      this.player = JSON.parse(player);
      this.token = localStorage.getItem('token');
    }
  }

  getAllProducts(category,platform) {
    return this.http.get(`${environment.API_HOST}/web/player/products?token=${this.auth.getToken()}&category=${category}&platform=${platform}`)
      .map(response => response);
  }

  getProduct(productId) {
    return this.http.get(`${environment.API_HOST}/web/player/product/${productId}?token=${this.auth.getToken()}`)
      .map(response => response);
  }

}
