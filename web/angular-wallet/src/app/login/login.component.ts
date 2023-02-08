import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  version = environment.version;

  constructor(){}


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
