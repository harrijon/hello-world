import { PickService } from './../services/pick.service';
import { PicksService } from './../services/picks.service';
import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { NotFoundError } from '../common/not-found-error';
import { forEach } from '@angular/router/src/utils/collection';
import { PickComponent } from '../pick/pick.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any[];
  picks: any[];
  pick: PickComponent;
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
  
        this.pick.playerid = this.playerid;

        // console.log("gLen: " + gLen);
        // console.log("pLen: " + pLen);

        while (g < gLen) {
          console.log("g: " + g);
          let p = 0;
          let newPick = this.pick;
          this.games[g].myPick = newPick;

          this.games[g].myPick.gameid = this.games[g].id;

          console.log("a this.games[g].myPick.winnerID: " + this.games[g].myPick.winnerID);
          this.games[g].myPick.winnerID = 0;

          while (p < pLen) {
            // console.log("p: " + p);
            if (this.picks[p].gameid == this.games[g].id) {
              this.games[g].myPick.winnerID = this.picks[p].winnerID;
              // console.log("this.games[g].myPick.winnerID: " + this.games[g].myPick.winnerID);
              break;
            }
            p++;
          }

          console.log("b this.games[g].myPick.winnerID: " + this.games[g].myPick.winnerID);
          g++;
        }
      }); 
      
  }


  picked(game, teamid: number) {
    let retVal: Boolean = false;

    // console.log("game.id: " + game.id + " - teamid: " + teamid + "  -  game.myPick: " + game.myPick.winnerID);
    if (game.myPick.winnerID == teamid) {
      retVal = true;
      console.log("true");
    }
    // this.picks.forEach(function(pick) {
    //   if (pick.gameid == gameid) {
    //     retVal = true;
    //   }
    // });
    // if (this.picks !== null) {
    //   let len: number = this.picks.length;
    //   let i: number = 0;

    //   while (i < len) {
    //     if ((this.picks[i].gameid == game.id) && (this.picks[i].winnerID == teamid)) {
    //       retVal = true;
    //       break;
    //     }
    //     i++;
    //   }
    // }

    return retVal;
  }


  
  updatePick(game, teamid) {
    let retVal: Boolean = false;
    game.myPick.winnerID = teamid;

    let curPick;

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
    
    this.picksService.updatePick(curPick);
    console.log("teamid: " + teamid + "  -  game.myPick: " + game.myPick);

    return retVal;
  }

  deSelect(game) {
    console.log("deleting pick: " + game.id);

    this.picksService.deletePick(game.id); 
    
  }

}
