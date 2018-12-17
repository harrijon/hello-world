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
  pick: Pick;
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
          let newPick = new Pick();
          newPick.gameid = this.games[g].id;
          newPick.playerid = this.playerid;
          this.games[g].myPick = Object.assign(new Pick(), newPick);

          while (p < pLen) {
            if (this.picks[p].gameid == this.games[g].id) {
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

    let curPick = new Pick();

    if (this.picks !== null) {
      let len: number = this.picks.length;
      let i: number = 0;

      while (i < len) {
        if ((this.picks[i].gameid == game.id) && (this.picks[i].winnerID == teamid)) {
          curPick = this.picks[i];
          break;
        }
        i++;
      }
    }

    curPick.winnerID = teamid;
    
    this.picksService.updatePick(curPick)
      .subscribe(respobj => {
        console.log("respobj: " + respobj);
      });
    console.log("teamid: " + teamid + "  -  game.myPick: " + game.myPick.winnerID);

    return retVal;
  }




  deSelect(game) {
    console.log("deleting pick: " + game.id);

    this.picksService.deletePick(game.id); 
    
  }

}
