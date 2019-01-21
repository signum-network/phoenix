import { Component, OnInit } from '@angular/core';
import { constants } from '../constants';
import { I18nService } from '../layout/components/i18n/i18n.service';
import { MatSelectChange } from '@angular/material';
import { Account } from '@burst/core';

@Component({
    selector: 'app-setup',
    styleUrls: ['./setup.component.css'],
    templateUrl: './setup.component.html'
})
export class SetupComponent implements OnInit {

    public languages: Array<any>;
    public currentLanguage: any;

    constructor(private i18n: I18nService) {
    }

    ngOnInit() {
        this.languages = constants.languages;
        this.currentLanguage = this.i18n.currentLanguage;
    }

    setLanguage(event: MatSelectChange) {
        this.currentLanguage = event.value;
        this.i18n.setLanguage(event.value)
    }

}
