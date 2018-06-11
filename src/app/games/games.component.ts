import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../services/eventEmitter.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  playerCode: string;
  gameList: any;
  platformType: string;
  constructor(
    private auth: AuthService,
    private gameService: GameService,
    private _messageService: EventService,
    private toaster: ToastrService
  ) {
    this.playerCode = this.auth.getLoggedInPlayer().code;
    this.platformType = 'android';
    this._messageService.listen().subscribe((m: any) => {
      console.log(m);
      this.setPlatformType(m);
    })
  }

  ngOnInit() {
    this.gameService.getAllGames('all')
      .subscribe(data => {
        if (data['games']) {
          this.gameList = data['games'];
          console.log(this.gameList);
        }
      }, errObj => {
        this.toaster.error('Error', errObj.error.err, {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      });
  }

  setPlatformType(value) {
    this.platformType = value;
    this.gameService.getAllGames(this.platformType)
      .subscribe(data => {
        if (data['games']) {
          this.gameList = data['games'];
        }
      }, errObj => {
        this.toaster.error('Error', errObj.error.err, {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      });
  }
}
