import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-new',
    styleUrls: ['./account.component.scss'],
    templateUrl: './account.component.html'
})
export class AccountNewComponent implements OnInit {


    constructor(private router: Router) {}

    public ngOnInit() {

    }

    public ngOnDestroy() {

    }

}
