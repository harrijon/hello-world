import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {

  @Input('isActive')isLiked: boolean;
  @Output('likesCount')likesCount: number;

  
  constructor() { 
    this.likesCount = 0;
  }

  onClick() {
    let posNeg = (this.isLiked) ? -1 : 1;
    
    this.likesCount += posNeg;
    this.isLiked = !this.isLiked;
  }

}
