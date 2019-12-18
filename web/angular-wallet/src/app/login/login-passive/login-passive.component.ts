import {Component, OnDestroy, OnInit} from '@angular/core';
import '../../../particles';

declare const particlesJS: any;

@Component({
  selector: 'app-login-passive',
  templateUrl: './login-passive.component.html',
  styleUrls: ['./login-passive.component.scss']
})
export class LoginPassiveComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {
    particlesJS.load('login-particles', 'assets/particles.json');
  }

  ngOnDestroy(): void {
    // @ts-ignore
    if (window.pJSDom) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window["pJSDom"] = []; // see https://github.com/VincentGarreau/particles.js/issues/63
    }
  }
}
