import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any[];

  constructor(private service: GamesService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(games => this.games = games);
  }

}
