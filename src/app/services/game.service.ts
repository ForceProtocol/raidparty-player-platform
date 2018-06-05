import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class GameService {

  constructor(
    private http: HttpClient,
    private ruoter: Router
  ) { }

  getUserPlayedGames() {

  }

  getAllGames() {

  }

  getGameProgress(params) {

  }



}
