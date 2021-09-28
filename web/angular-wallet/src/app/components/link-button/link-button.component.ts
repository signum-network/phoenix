import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent implements OnInit {
  @Input() routerLink: string;

  constructor() { }

  ngOnInit(): void {
  }

}
