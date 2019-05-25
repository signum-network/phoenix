import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  @Input()
  title: string;

  constructor() { }

}
