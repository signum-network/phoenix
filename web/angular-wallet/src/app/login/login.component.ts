import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {destroy, initialize} from '../../particles';
import particleConf from '../../particles/config';

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
    initialize('login-particles', particleConf);
  }

  ngOnDestroy(): void {
    destroy();
  }
}
