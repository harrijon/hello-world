import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {

  @Input('isActive')isLiked: boolean;
  @Input('likesCount')likesCount: number;

  onClick() {
    let posNeg = (this.isLiked) ? -1 : 1;
    
    this.likesCount += posNeg;
    this.isLiked = !this.isLiked;

  }

}
