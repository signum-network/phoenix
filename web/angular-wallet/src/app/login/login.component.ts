import { Component, OnInit } from '@angular/core';
// import { AccountService } from '../../lib/services';
// import { CreateService } from '../dashboard/setup/account/create.service';
// import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor() {}

  version = environment.version;

  ngOnInit() {
  }
}
