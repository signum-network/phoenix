import {Component, OnDestroy, OnInit} from '@angular/core';
import {destroy, initialize} from '../../../particles';
import particleConf from '../../../particles/config';

@Component({
  selector: 'app-login-passive',
  templateUrl: './login-passive.component.html',
  styleUrls: ['./login-passive.component.scss']
})
export class LoginPassiveComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {
    initialize('login-particles', particleConf);
  }

  ngOnDestroy(): void {
    destroy();
  }
}
