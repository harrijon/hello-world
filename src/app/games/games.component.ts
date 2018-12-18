import { PickService } from './../services/pick.service';
import { PicksService } from './../services/picks.service';
import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { NotFoundError } from '../common/not-found-error';
import { forEach } from '@angular/router/src/utils/collection';
import { Pick } from '../pick/pick';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any[];
  picks: any[];
  playerid: number = 95633;
  tid: number = 196;
  wk: number = 2; 


  constructor(private service: GamesService, 
        //private pickService: PickService,
        private picksService: PicksService) { }

  ngOnInit() {
    // this.pickService.getEmptyObject()
    //   .subscribe(respobj => {
    //     this.pick = respobj.pick;
    //     this.pick.playerid = this.playerid;
    //   }
    //   );

    this.picksService.getPicks(this.playerid, this.wk)
      .subscribe(respobj => this.picks = respobj.picks);

    this.service.getGames(this.tid, this.wk)
      .subscribe(respobj => {
        this.games = respobj.games;

        let gLen: number = this.games.length;
        let pLen: number = this.picks.length;
        let g: number = 0;
        let p: number = 0;
  
 
        while (g < gLen) {
          let p = 0;

          //deep copy object
          //src: https://stackoverflow.com/questions/34688517/whats-alternative-to-angular-copy-in-angular
          let newPick = new Pick(this.playerid, this.games[g].id);
          newPick.gameid = this.games[g].id;
          newPick.playerid = this.playerid;
          this.games[g].myPick = Object.assign(new Pick(this.playerid, this.games[g].id), newPick);

          while (p < pLen) {
            if (this.picks[p].gameid == this.games[g].id) {
              this.games[g].myPick.id = this.picks[p].id;
              this.games[g].myPick.winnerID = this.picks[p].winnerID;
              break;
            }

            p++;
          }

          g++;
        }
      }); 
      
  }


  picked(game, teamid: number) {
    let retVal: Boolean = false;

    if (game.myPick.winnerID == teamid) {
      retVal = true;
    }

    return retVal;
  }


  
  updatePick(game, teamid) {
    let retVal: Boolean = false;
    game.myPick.winnerID = teamid;

    this.picksService.updatePick(game.myPick)
      .subscribe(respobj => {
        let updPick = respobj.picks;
        game.myPick.id = updPick.id;
      });

    return retVal;
  }




  deSelect(game) {
    console.log("deleting pick: " + game.myPick.id);

    this.picksService.delete(game.myPick.id)
      .subscribe(respobj => {
        console.log("respobj: " + respobj);
        console.log(respobj);
        let newPick = new Pick(this.playerid, game.id);
        game.myPick = Object.assign(new Pick(this.playerid, game.id), newPick);

      },
      (err) => {
        console.log("deSelect error: " + err);
        console.log(err);
      }); 
    
  }

}
