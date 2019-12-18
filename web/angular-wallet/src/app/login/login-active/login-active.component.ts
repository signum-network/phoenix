import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {destroy, initialize} from '../../../particles';
import particleConf from '../../../particles/config';

@Component({
  selector: 'app-login-active',
  templateUrl: './login-active.component.html',
  styleUrls: ['./login-active.component.scss']
})
export class LoginActiveComponent implements OnInit, OnDestroy {
  newUser: Observable<string | false>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    initialize('login-particles', particleConf);
    this.newUser = this.route.queryParamMap
      .pipe(map(params => params.get('newUser') || false));
  }

  ngOnDestroy(): void {
    destroy();
  }
}
