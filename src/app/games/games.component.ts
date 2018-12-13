import { PicksService } from './../services/picks.service';
import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';
import { ResolvedStaticSymbol } from '@angular/compiler';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any[];
  picks: any[];
  tid: number = 196;
  wk: number = 2; 


  constructor(private service: GamesService, private picksService: PicksService) { }

  ngOnInit() {
    this.picksService.getPicks(95633, this.wk)
      .subscribe(respobj => this.picks = respobj.picks);

    this.service.getGames(this.tid, this.wk)
      .subscribe(respobj => this.games = respobj.games); 

  }


  picked(game, teamid: number) {
    let retVal: Boolean = false;

    // this.picks.forEach(function(pick) {
    //   if (pick.gameid == gameid) {
    //     retVal = true;
    //   }
    // });
    if (this.picks !== null) {
      let len: number = this.picks.length;
      let i: number = 0;

      while (i < len) {
        if ((this.picks[i].gameid == game.id) && (this.picks[i].winnerID == teamid)) {
          retVal = true;
          break;
        }
        i++;
      }
    }

    return retVal;
  }
}
