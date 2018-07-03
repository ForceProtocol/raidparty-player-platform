import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/eventEmitter.service';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent implements OnInit {
  playerCode: string;
  playerGames: any;
  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private toaster: ToastrService,
    private _messageService: EventService,
  ) {
    this.playerCode = this.authService.getLoggedInPlayer().code;
  }

  ngOnInit() {
  }

}