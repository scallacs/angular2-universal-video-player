import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';

import { AnnotationModel } from './annotation.model';

@Component({
  selector: 'videotagger-annotation',
  templateUrl: './annotation.html',
  styleUrls: ['./style.css']
})
export class AnnotationComponent implements OnInit {

  @Input() model: AnnotationModel;

  @Output() onCardClick = new EventEmitter();

  @Input() public cardStyle = {};

  public luminosity = 1;

  ngOnInit(): void {

  }

  _onCardClick(){
    console.log('AnnotationComponent', '_onCardClick()');
    this.onCardClick.emit();
  }

}
