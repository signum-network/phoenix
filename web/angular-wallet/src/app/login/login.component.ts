import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor() {
  }

  version = environment.version;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
