import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PicksService } from './../services/picks.service';
import { GamesService } from './../services/games.service';
import { Subscription } from 'rxjs/Subscription';



@Injectable()
export class GamesCompResolve implements Resolve<any> {

  games: any[];
  picks: any[];
  playerid: number = 95633;
  tid: number = 196;
  wk: number = 2; 
    
  constructor(private service: GamesService, 
    private picksService: PicksService){}


  resolve(route:ActivatedRouteSnapshot, 
         state:RouterStateSnapshot,
        ): Observable<any> {
     //return this.service.getGames(this.tid, this.wk);  

     return forkJoin([
      this.picksService.getPicks(this.playerid, this.wk),
        //.subscribe(respobj => this.picks = respobj.picks),
        this.service.getGames(this.tid, this.wk)
        .catch(error => {

            /* if(error.status === 404) {
                this.router.navigate(['subscription-create']);
            } */

            return Observable.throw(error);
          })
      ]).map(result => {
        return {
            picks: result[0].picks,
            games: result[1].games
        };
      });

   }

}
