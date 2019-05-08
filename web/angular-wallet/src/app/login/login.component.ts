import '../../particles';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {environment} from '../../environments/environment';

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

  ngOnInit() {
    particlesJS.load('login-particles', 'assets/particles.json');
  }

  ngOnDestroy() {
    // @ts-ignore
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window["pJSDom"] = []; // see https://github.com/VincentGarreau/particles.js/issues/63
  }
}
