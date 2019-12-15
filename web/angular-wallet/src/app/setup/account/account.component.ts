import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-account-new',
    styleUrls: ['./account.component.scss'],
    templateUrl: './account.component.html'
})
export class AccountNewComponent {
  constructor(private router: Router) {}
}
