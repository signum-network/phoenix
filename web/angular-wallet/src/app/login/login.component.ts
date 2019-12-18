import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

import '../../particles';

declare const particlesJS: any;

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
    particlesJS.load('login-particles', 'assets/particles.json');
  }

  ngOnDestroy(): void {
    if (window.pJSDom) {
      // @ts-ignore
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window["pJSDom"] = []; // see https://github.com/VincentGarreau/particles.js/issues/63
    }
  }
}
