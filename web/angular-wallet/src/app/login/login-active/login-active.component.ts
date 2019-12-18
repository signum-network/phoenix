import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../../../particles';
declare const particlesJS: any;

@Component({
  selector: 'app-login-active',
  templateUrl: './login-active.component.html',
  styleUrls: ['./login-active.component.scss']
})
export class LoginActiveComponent implements  OnInit, OnDestroy  {
  newUser: Observable<string | false>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    particlesJS.load('login-particles', 'assets/particles.json');
    this.newUser = this.route.queryParamMap
        .pipe(map(params => params.get('newUser') || false));
  }

  ngOnDestroy(): void {
      // @ts-ignore
    if (window.pJSDom) {
      // @ts-ignore
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window['pJSDom'] = []; // see https://github.com/VincentGarreau/particles.js/issues/63
    }
  }

}
