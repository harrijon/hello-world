import { Injectable } from '@angular/core';

@Injectable()
export class AuthorsService {

  authors = ["author 1", "author 2", "author 3"];

  constructor() {
    
  }

  getAuthors(){
    return this.authors;
  }
}
