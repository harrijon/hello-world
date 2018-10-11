import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favClicked = false;

  onClick() {    
    this.favClicked = !this.favClicked;
    console.log("star clicked, star:" + this.favClicked);
  }
  constructor() {
    console.log("star:" + this.favClicked);
  }

  ngOnInit() {
  }

}
