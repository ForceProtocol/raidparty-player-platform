import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  loggedInPlayer: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loggedInPlayer = localStorage.getItem('player');
    console.log(this.loggedInPlayer);
  }

}
