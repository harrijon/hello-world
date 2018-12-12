import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class GamesService extends DataService {
  http1: Http;
  url1: string;

  constructor(http: Http) {
    let url1 = 'http://localhost:3000/games';
    //let url1 = 'http://localhost:49918/api/games'; //http://localhost:49918/api/games?tid=196&wk=2
    super(url1, http);
   }


   getGames(tid, wk) { 
     
    return this.http.get(this.url + '?tid=' + tid + '&wk=' + wk)
      .map(response => response.json())
      .catch(this.handleError);
  }

}
