import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class PickService extends DataService {
  url1: string;

  constructor(http: Http) {
    let url1 = 'http://localhost:3000/pick';
    //let url1 = 'http://localhost:49918/api/pick'; //http://localhost:49918/api/picks?playerid=95633&wk=2
    super(url1, http);
   }

   getEmptyObject() {
     return this.getAll();
   }
}
