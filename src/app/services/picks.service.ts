import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class PicksService extends DataService {
  url1: string;

  constructor(http: Http) {
    let url1 = 'http://localhost:3000/picks';
    //let url1 = 'http://localhost:49918/api/picks'; //http://localhost:49918/api/picks?playerid=95633&wk=2
    super(url1, http);
   }


   getPicks(playerid, wk) { 
     
    return this.http.get(this.url + '?playerid=' + playerid + '&wk=' + wk)
      .map(response => response.json())
      .catch(this.handleError);
  }

  updatePick(pick) {

    if (pick.id == "") {
      console.log("post");
      return this.http.post(this.url, pick)
      .map(response => response.json())
      .catch(this.handleError);
    }
    else {
      console.log("patch");
      return this.http.patch(this.url + '/' + pick.id, pick)
      .map(response => response.json())
      .catch(this.handleError);
    }
  }

}
