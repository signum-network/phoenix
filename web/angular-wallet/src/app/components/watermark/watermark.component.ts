import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-watermark',
  templateUrl: './watermark.component.html',
  styleUrls: ['./watermark.component.scss']
})
export class WatermarkComponent implements OnInit {

  @Input() invert = false;

  constructor() { }

  ngOnInit(): void {
  }

}
