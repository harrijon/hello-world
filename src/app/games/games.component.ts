import { PicksService } from './../services/picks.service';
import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { NotFoundError } from '../common/not-found-error';
import { forEach } from '@angular/router/src/utils/collection';

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
      .subscribe(respobj => {
        this.games = respobj.games;

        let gLen: number = this.games.length;
        let pLen: number = this.picks.length;
        let g: number = 0;
        let p: number = 0;
  
        // console.log("gLen: " + gLen);
        // console.log("pLen: " + pLen);

        while (g < gLen) {
          // console.log("g: " + g);
          let p = 0;
          
          while (p < pLen) {
            // console.log("p: " + p);
            if (this.picks[p].gameid == this.games[g].id) {
              this.games[g].myPick = this.picks[p].winnerID;
              //console.log("this.games[g].myPick: " + this.games[g].myPick);
              break;
            }
            p++;
          }
          g++;
        }
      }); 
      
  }


  picked(game, teamid) {
    let retVal: Boolean = false;

    // console.log("teamid: " + teamid + "  -  game.myPick: " + game.myPick);
    if (game.myPick == teamid) {
      retVal = true;
      // console.log("true");
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

  deSelect(game) {
    console.log("deleting pick: " + game.id);

    this.picksService.deletePick(game.id); 
    
  }

}
