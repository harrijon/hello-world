import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any[];
  tid: number = 196;
  wk: number = 2;

  constructor(private service: GamesService) { }

  ngOnInit() {
    this.service.getGames(this.tid, this.wk)
      .subscribe(respobj => this.games = respobj.games);
  }

}
