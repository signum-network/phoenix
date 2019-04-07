import 'particles.js';
import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

declare const particlesJS: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  version = environment.version;

  ngOnInit() {
    particlesJS.load('login-particles', 'assets/particles.json');
  }
}
