import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login-active',
  templateUrl: './login-active.component.html',
  styleUrls: ['./login-active.component.scss']
})
export class LoginActiveComponent implements OnInit, OnDestroy {
  newUser: boolean;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.newUser = this.route.snapshot.queryParams.newUser === 'true';
  }

  ngOnDestroy(): void {
  }
}
