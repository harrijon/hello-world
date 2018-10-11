import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  //authorCount = 3;
    authors;
  

  constructor(service: AuthorsService) {     
    this.authors = service.getAuthors();
  }

  getAuthorCount() {
    return this.authors.length;
  }

  ngOnInit() {
  }

}
