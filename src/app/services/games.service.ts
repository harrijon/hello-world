import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class GamesService extends DataService {

  constructor(http: Http) {
    super('http://localhost:3000/games', http)
   }

}
