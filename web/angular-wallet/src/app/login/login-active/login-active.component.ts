import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login-active',
  templateUrl: './login-active.component.html',
  styleUrls: ['./login-active.component.scss']
})
export class LoginActiveComponent implements OnInit {
  newUser: Observable<string | false>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.newUser = this.route.queryParamMap
        .pipe(map(params => params.get('newUser') || false));
  }

}
