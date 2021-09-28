import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-token-overview',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() account: Account;

  constructor() { }

  ngOnInit() : void{
  }

}
