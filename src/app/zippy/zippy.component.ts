import { Component, OnInit, Input, ElementRef } from '@angular/core';


@Component({
  selector: 'zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css']
})
export class ZippyComponent {
  @Input('title') title?: string;
  isExpanded = false;
  innerContent = '';

  constructor(private el: ElementRef) { 
    this.innerContent = this.el.nativeElement.innerText;
  }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

}
