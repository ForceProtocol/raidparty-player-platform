import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  playerCode: string;
  playerGames: any;
  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private toaster: ToastrService
  ) {
    this.playerCode = this.authService.getLoggedInPlayer().code;
  }

  ngOnInit() {
    this.gameService.getUserPlayedGames()
      .subscribe((data) => {
        if (data['success']) {
          this.playerGames = data['gamesList'];
          console.log(this.playerGames);
        }
      }, errObj => {
        this.toaster.error('Error', errObj.error.err, {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      });
  }

  gameRewardProgress(rewards) {
    for (const reward of rewards) {
      this.gameService.getGameRewardsProgress(reward.id)
        .subscribe(data => {
          reward['progress'] = (data['playerCompletedEvents'] / data['totalEventstoBeCompleted']) * 100;
          console.log(data);
        }, errObj => {

        });
    }
  }

}
